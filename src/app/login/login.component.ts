import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSuccessMessages = false;
  showErrorMessages = false;

  formGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\d).{8,}$')])
  });

  constructor(private router: Router) { } 

  salvar(): void {
    console.log('Salvando Usuário');
    console.log(this.formGroup.controls.login.invalid);
    console.log(this.formGroup.controls.login.touched); 
    console.log(this.formGroup.controls.senha.invalid);
    console.log(this.formGroup.controls.senha.touched);    

    if (this.formGroup.invalid) {
      console.log('Login Inválido!');
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }
    console.log('Login efetuado!');
    console.log('Login: ' + this.formGroup.controls.login.value);
    console.log('Senha: ' + this.formGroup.controls.senha.value);
  
    console.log('Login válido');
    this.showSuccessMessages = true;
  }

  login() {
    this.router.navigate(['/layout/jogo']);
  }
}
