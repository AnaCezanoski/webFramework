import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { PedidosModel } from '../model/pedidos.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private pedidos: PedidosModel[] = [];

  constructor(private db: AngularFireDatabase) { }

  registrarCompra(pedido: PedidosModel) {
    this.pedidos.push(pedido);
    return this.db.list('pedidos').push(pedido);
  }
}
