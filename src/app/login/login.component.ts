import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  
  constructor(private router: Router,
    public afAuth: AngularFireAuth,) { }
    
  realizarLogin() {
    console.log('Login: ' + this.login.value);
    console.log('Senha: ' + this.password.value);
    if (this.login.valid && this.password.valid) {
      this.afAuth
        .signInWithEmailAndPassword(this.login.value!, this.password.value!)
        .then((result) => {
          console.log(result.user);
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log(error);
          window.alert('Erro ao fazer login: ' + error.message);
          this.password.reset();
        });
    } else {
      window.alert('Por favor, insira um e-mail e senha válidos.');
    }
  }

  recuperarSenha(event: any) {
    event.preventDefault();
    if (this.login.valid) {
      this.afAuth.sendPasswordResetEmail(this.login.value!).then(() => {
        window.alert('Email para recuperar senha enviado, verifique sua caixa de entrada');
      })
      .catch((error) => {
        window.alert('Erro ao enviar email de recuperação: ' + error.message);
      });
    } else {
      window.alert('Por favor, insira um e-mail válido.');
    }
  }
}