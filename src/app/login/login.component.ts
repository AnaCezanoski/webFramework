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

    recuperarSenha() {
      this.afAuth.sendPasswordResetEmail(this.login.value!).then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
    }
}