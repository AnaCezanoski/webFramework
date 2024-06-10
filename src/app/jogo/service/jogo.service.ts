import { Injectable } from '@angular/core';
import { JogoModel } from '../model/jogo.model';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  paramMap: any;

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

  listar(): Observable<JogoModel[]> {
    return this.db.list('jogo').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const data = c.payload.val() as JogoModel;
            const key = c.key;
            return { ...data, key: key } as JogoModel;
          });
        })
      );
  }
  
  uploadImagem(file: any) {
    const path = 'imagens/'+file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }

  alterarQuantidadeJogo(jogoKey: string, novaQuantidade: number): Promise<void> {
    return this.db.object(`jogo/${jogoKey}/quantidade`).set(novaQuantidade);
  }
}