import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  salvar(usuario: UsuarioModel){
    return this.db.list('usuario').push(usuario);
  }

  excluir(key: any) {
    return this.db.object('usuario/' + key).remove();
  }

  carregar(key: any): Observable<any> {
    return this.db.object('usuario/' + key).valueChanges();
  }

  alterar(key: any, usuario: UsuarioModel) {
    return this.db.object('usuario/' + key).update(usuario);
  }

  listar() {
    return this.db.list('usuario').snapshotChanges().pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({
          key: c.key, 
          ...c.payload.val() as UsuarioModel
        }));
      })
    );
  }

  uploadImagem(file: any) {
    const path = 'imagens/' + file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }

  getUsuarioByEmail(email: string): Observable<UsuarioModel | null> {
    return this.db.list('usuario', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().pipe(
      map(changes => {
        const usuarios = changes.map(c => ({
          key: c.key || undefined,
          ...c.payload.val() as UsuarioModel
        }));
        return usuarios.length > 0 ? usuarios[0] : null;
      })
    );
  }
}