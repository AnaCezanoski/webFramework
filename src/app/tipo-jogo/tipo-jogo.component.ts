import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-jogo',
  templateUrl: './tipo-jogo.component.html',
  styleUrl: './tipo-jogo.component.css'
})
export class TipoJogoComponent {
    showSuccessMessages = false;
    showErrorMessages = false;

  formGroup = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
  });


  constructor() { }

    ngOnInit(): void { }

    salvar(): void {
      console.log('Salvando Tipo de Jogo');

      console.log(this.formGroup.controls.tipo.invalid);
      console.log(this.formGroup.controls.tipo.touched); 
      console.log(this.formGroup.controls.descricao.invalid);
      console.log(this.formGroup.controls.descricao.touched); 

      if (this.formGroup.invalid) {
        console.log('Cadastro de tipo de jogo Inválido!')
        this.formGroup.markAllAsTouched();
        this.showErrorMessages = true;
        return;
      }

      console.log('Tipo: ' + this.formGroup.controls.tipo.value);
      console.log('Descrição: ' + this.formGroup.controls.descricao.value);
    
      console.log('Cadastro de tipo de jogo válido');
      this.showSuccessMessages = true;
    }
}

