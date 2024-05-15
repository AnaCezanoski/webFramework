import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JogoModel } from '../model/jogo.model';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvar(jogo: JogoModel) {
    return this.db.list('jogo').push(jogo);
  }

  excluir(key: any) {
    return this.db.object('jogo/'+key).remove();
  }

  carregar(key: any): Observable<any> {
    return this.db.object('jogo/'+key).valueChanges();
  }

  alterar(key: any, jogo: JogoModel) {
    return this.db.object('jogo/'+key).update(jogo);
  }

  listar() {
    return this.db.list('jogo').snapshotChanges()
    .pipe(
      map(changes => {
        console.log(changes)
        return changes.map(c => ({key: c.key, 
          ...c.payload.val() as JogoModel}));
      })
    );
  }
  uploadImagem(file: any) {
    const path = 'imagens/'+file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }
}
