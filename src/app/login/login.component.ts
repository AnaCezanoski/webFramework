import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    console.log('Senha  ' + this.password.value);
    this.afAuth
      .signInWithEmailAndPassword(this.login.value!, this.password.value!)
      .then((result) => {
        console.log(result.user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  recuperarSenha(event: any) {
    event.preventDefault();
    this.afAuth.sendPasswordResetEmail(this.login.value!).then(() => {
      window.alert('Email para recuperar senha enviado, verifique sua caixa de entrada');
    })
    .catch((error) => {
      window.alert(error);
    });
  }

  excluirConta() {
    this.afAuth.currentUser?.then((user) => {
      user?.delete().then(() => {
        window.alert('Conta excluída com secusso'); 
      }).catch((error) => {
        window.alert(error);
      });
    });
  }
}