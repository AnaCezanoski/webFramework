import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoJogoModel } from '../model/tipo-jogo.model';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class TipoJogoService {

  constructor(private db: AngularFireDatabase) { }

  salvar(tipojogo: TipoJogoModel) {
    return this.db.list('tipo-jogo').push(tipojogo);
  }

  excluir(key: any) {
    return this.db.object('tipo-jogo/'+key).remove();
  }

  carregar(key: any): Observable<any> {
    return this.db.object('tipo-jogo/'+key).valueChanges();
  }

  alterar(key: any, tipojogo: TipoJogoModel) {
    return this.db.object('tipo-jogo/'+key).update(tipojogo);
  }

  listar() {
    return this.db.list('tipo-jogo').snapshotChanges()
    .pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({ 
          key: c.key || undefined, 
          ...c.payload.val() as TipoJogoModel}));
      })
    );
  }
}
