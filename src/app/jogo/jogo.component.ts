import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.css'
})
export class JogoComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  formGroup = new FormGroup({

    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    categoria: new FormControl(''),
    desc: new FormControl('', [Validators.required]),
    cover: new FormControl('', [Validators.required]),
  });


  constructor() { }

    ngOnInit(): void { }

    salvar(): void {
      console.log('Salvando Jogo');

      console.log(this.formGroup.controls.nome.invalid);
      console.log(this.formGroup.controls.nome.touched); 
      console.log(this.formGroup.controls.preco.invalid);
      console.log(this.formGroup.controls.preco.touched); 
      console.log(this.formGroup.controls.categoria.invalid);
      console.log(this.formGroup.controls.categoria.touched);   
      console.log(this.formGroup.controls.desc.invalid);
      console.log(this.formGroup.controls.desc.touched);   
      console.log(this.formGroup.controls.cover.invalid);
      console.log(this.formGroup.controls.cover.touched);

      if (this.formGroup.invalid) {
        console.log('Cadastro de jogo Inválido!')
        this.formGroup.markAllAsTouched();
        this.showErrorMessages = true;
        return;
      }

      console.log('Nome: ' + this.formGroup.controls.nome.value);
      console.log('Preço: ' + this.formGroup.controls.preco.value);
      console.log('Categoria: ' + this.formGroup.controls.categoria.value);
      console.log('Descrição: ' + this.formGroup.controls.desc.value);
      console.log('Imagem de capa: ' + this.formGroup.controls.cover.value);
    
      console.log('Cadastro de jogo válido');
      this.showSuccessMessages = true;
    }
}
