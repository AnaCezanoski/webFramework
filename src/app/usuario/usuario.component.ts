import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from './model/usuario.model';
import { UsuarioService } from './service/usuario.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    dtNasc: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    confirmSenha: new FormControl('', [Validators.required]),
  });

  constructor(private usuarioService: UsuarioService, private router: ActivatedRoute ) { }

  ngOnInit(): void { 
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.usuarioService.carregar(paramMap.get('key')).subscribe(usuario => {
          this.formGroup.controls.nome.patchValue(usuario.nome);
        });
      }
    })
  }

    salvar(): void {
      if (this.formGroup.invalid) {
        console.log('Formulário inválido!')
        this.formGroup.markAllAsTouched();
        this.showErrorMessages = true;
        return;
      }

      if (this.key) {

      } else {
        var usuario = new UsuarioModel();
        usuario.nome = this.formGroup.controls.nome.value?.toString();
        usuario.dtNasc = this.formGroup.controls.dtNasc.value?.toString();
        usuario.email = this.formGroup.controls.email.value?.toString();
        usuario.telefone = this.formGroup.controls.telefone.value?.toString();
        usuario.cpf = this.formGroup.controls.cpf.value?.toString();
        usuario.endereco = this.formGroup.controls.endereco.value?.toString();
        usuario.senha = this.formGroup.controls.senha.value?.toString();

      this.usuarioService.salvar(usuario).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }
}