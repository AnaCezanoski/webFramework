import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JogoModel } from '../model/jogo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) { }

  salvar(jogo: JogoModel): Observable<JogoModel> {
    return this.http.
    post('https://boardlend-9a2d8-default-rtdb.firebaseio.com/jogo.json', jogo)
  }

  listar(): Observable<JogoModel[]> {
    return this.http.
    get<JogoModel[]>('https://boardlend-9a2d8-default-rtdb.firebaseio.com/jogo.json')
  }
}
