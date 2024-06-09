import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PedidosModel } from '../model/pedidos.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JogoModel } from '../../jogo/model/jogo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) { }

  registrarCompra(pedidos: PedidosModel) {
    return this.db.list('pedidos').push(pedidos);
  }

  excluir(key: any) {
    return this.db.object('pedidos/' + key).remove();
  }

  carregar(key: any): Observable<PedidosModel> {
    return this.db.object('pedidos/' + key).valueChanges() as Observable<PedidosModel>;
  }

  alterar(key: any, pedidos: PedidosModel) {
    return this.db.object('pedidos/' + key).update(pedidos);
  }

  listar(): Observable<PedidosModel[]> {
    return this.db.list('pedidos').snapshotChanges().pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({
          key: c.key, 
          ...c.payload.val() as PedidosModel
        }));
      })
    );
  }    
}
