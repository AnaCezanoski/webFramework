import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFireDatabase) { }

  salvar(usuario: UsuarioModel) { 
    return this.db.list('usuario').push(usuario);   
  }

  excluir(key: any) {
    return this.db.object('usuario/'+key).remove();
  }

  carregar(key: any) : Observable<any> {
    return this.db.object('usuario/'+key).valueChanges();
  }

  listar() {
    return this.db.list('usuario').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as UsuarioModel}));
      })
    );
  }
}