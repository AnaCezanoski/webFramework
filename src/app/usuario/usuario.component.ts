import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from './model/usuario.model';
import { UsuarioService } from './service/usuario.service';
import { error } from 'console';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    dtNasc: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
  });

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void { }

    salvar(): void {
      console.log('Salvando Usuário');

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
      console.log(this.formGroup.controls.endereco.invalid);
      console.log(this.formGroup.controls.endereco.touched);

      if (this.formGroup.invalid) {
        console.log('Formulário Inválido!')
        this.formGroup.markAllAsTouched();
        this.showErrorMessages = true;
        return;
      }


      var usuario = new UsuarioModel();

      usuario.nome = this.formGroup.controls.nome.value?.toString();
      usuario.dtNasc = this.formGroup.controls.dtNasc.value?.toString();
      usuario.email = this.formGroup.controls.email.value?.toString();
      usuario.telefone = this.formGroup.controls.telefone.value?.toString();
      usuario.cpf = this.formGroup.controls.cpf.value?.toString();
      usuario.endereco = this.formGroup.controls.endereco.value?.toString();

      this.usuarioService.salvar(usuario).subscribe(usuario => {
        console.log('Usuário salvo com sucesso.')
        console.log(usuario)
        this.showSuccessMessages = true;
      }, error => {
        console.log(error);
        this.showErrorMessages = true;
      });

      console.log('Formulário válido');
    }
  }