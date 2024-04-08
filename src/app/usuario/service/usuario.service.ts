import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  salvar(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.
    post('https://boardlend-9a2d8-default-rtdb.firebaseio.com/usuario.json', usuario)
  }

  listar(): Observable<UsuarioModel[]> {
    return this.http.
    get<UsuarioModel[]>('https://boardlend-9a2d8-default-rtdb.firebaseio.com/usuario.json')

  }
}
