import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JogoModel } from '../model/jogo.model';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private db: AngularFireDatabase) { }

  salvar(jogo: JogoModel) {
    return this.db.list('jogo').push(jogo);
  }

  excluir(key: any) {
    return this.db.object('jogo/'+key).remove();
  }

  carregar(key: any): Observable<any> {
    return this.db.object('jogo/'+key).valueChanges();
  }

  listar() {
    return this.db.list('jogo').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val() as JogoModel}));
      })
    );
  }
}
