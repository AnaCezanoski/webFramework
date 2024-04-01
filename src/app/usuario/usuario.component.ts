import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    dtNasc: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]), // Adicionando validação de padrão para CPF
    endereco: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void { }

  salvar(): void {
    console.log('Salvando Usuário')
    console.log(this.formGroup.controls.nome.invalid);
    console.log(this.formGroup.controls.nome.touched); 
    console.log(this.formGroup.controls.dtNasc.invalid);
    console.log(this.formGroup.controls.dtNasc.touched); 
    console.log(this.formGroup.controls.email.invalid);
    console.log(this.formGroup.controls.email.touched);   
    console.log(this.formGroup.controls.telefone.invalid);
    console.log(this.formGroup.controls.telefone.touched);   
    console.log(this.formGroup.controls.cpf.invalid);
    console.log(this.formGroup.controls.cpf.touched);

    if (this.formGroup.invalid) {
      console.log('Formulário Inválido!');
      this.showErrorMessages = true;
      return;
    }

    console.log('Salvando usuário!');
    console.log('Nome: ' + this.formGroup.controls.nome.value);
    console.log('Data de Nascimento: ' + this.formGroup.controls.dtNasc.value);
    console.log('E-mail: ' + this.formGroup.controls.email.value);
    console.log('Telefone: ' + this.formGroup.controls.telefone.value);
    console.log('CPF: ' + this.formGroup.controls.cpf.value);

    console.log('Formulário válido');
    this.showSuccessMessages = true;
  }
}
