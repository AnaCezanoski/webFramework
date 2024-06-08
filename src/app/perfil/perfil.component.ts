import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/service/usuario.service';
import { UsuarioModel } from '../usuario/model/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario?: UsuarioModel;
  public userKey?: string;

  constructor(
    public afAuth: AngularFireAuth, 
    private usuarioService: UsuarioService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user && user.email) {
        console.log('Usuário logado:', user.email);
        this.usuarioService.getUsuarioByEmail(user.email).subscribe(usuario => {
          if (usuario) {
            console.log('Dados do usuário:', usuario);
            this.usuario = usuario;
            this.userKey = usuario.key;
          } else {
            console.log('Usuário não encontrado no banco de dados');
          }
        });
      }
    });
  }

  excluirConta(event: any) {
    event.preventDefault();
    if (this.userKey) {
      this.usuarioService.excluir(this.userKey).then(() => {
        this.afAuth.currentUser?.then(user => {
          user?.delete().then(() => {
            window.alert('Conta excluída com sucesso');
            this.router.navigate(['/layout/login']);
          }).catch((error) => {
            window.alert(error);
          });
        });
      }).catch((error) => {
        window.alert(error);
      });
    }
  }

  editar(event: any) {
    event.preventDefault();
    if (this.userKey) {
      this.router.navigate(['/layout/usuario/' + this.userKey]);
    }
  }
}