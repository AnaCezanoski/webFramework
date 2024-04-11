import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class LoginService {

  constructor(private http: HttpClient) { }

  salvar(login: LoginModel): Observable<LoginModel> {
    return this.http.
    post('https://boardlend-9a2d8-default-rtdb.firebaseio.com/login.json', login)
  }

  listar(): Observable<LoginModel[]> {
    return this.http.
    get<LoginModel[]>('https://boardlend-9a2d8-default-rtdb.firebaseio.com/login.json')
  }
}
  