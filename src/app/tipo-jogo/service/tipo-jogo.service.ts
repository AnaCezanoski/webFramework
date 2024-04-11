import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoJogoModel } from '../model/tipo-jogo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoJogoService {

  constructor(private http: HttpClient) { }

  salvar(tipojogo: TipoJogoModel): Observable<TipoJogoModel> {
    return this.http.
    post('https://boardlend-9a2d8-default-rtdb.firebaseio.com/tipojogo.json', tipojogo)
  }

  listar(): Observable<TipoJogoModel[]> {
    return this.http.
    get<TipoJogoModel[]>('https://boardlend-9a2d8-default-rtdb.firebaseio.com/tipojogo.json')
  }
}
