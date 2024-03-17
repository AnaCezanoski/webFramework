import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  nome: FormControl = new FormControl('', [Validators.required]);
  dtNasc: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required]);
  telefone: FormControl = new FormControl('', [Validators.required]);
  cpf: FormControl = new FormControl('', [Validators.required]);
  endereco: FormControl = new FormControl('', [Validators.required]);

  constructor() { }

    ngOnInit(): void { }

    salvar(): void {
      if (this.nome.invalid) {
        console.log('Nome Inválido!')
        return;
      }if (this.dtNasc.invalid) {
        console.log('Data Inválida!')
        return;
      }if (this.email.invalid) {
        console.log('E-mail Inválido!')
        return;
      }if (this.telefone.invalid) {
        console.log('Telefone Inválido!')
        return;
      }if (this.cpf.invalid) {
        console.log('CPF Inválido!')
        return;
      }if (this.endereco.invalid) {
        console.log('Endereço Inválido!')
        return;
      }
      console.log('Salvando usuário!');
      console.log('Nome: ' + this.nome.value);
      console.log('Data de Nascimento: ' + this.dtNasc.value);
      console.log('E-mail: ' + this.email.value);
      console.log('Telefone: ' + this.telefone.value);
      console.log('CPF: ' + this.cpf.value);
      console.log('Endereço: ' + this.endereco.value);
    }
}
