import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoJogoService } from './service/tipo-jogo.service';
import { TipoJogoModel } from './model/tipo-jogo.model';
import { error } from 'console';

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


  constructor(private tipojogoService: TipoJogoService) { }

    ngOnInit(): void { }

    salvar(): void {
      console.log('Salvando Tipo de Jogo');

      console.log(this.formGroup.controls.tipo.invalid);
      console.log(this.formGroup.controls.tipo.touched); 
      console.log(this.formGroup.controls.descricao.invalid);
      console.log(this.formGroup.controls.descricao.touched); 

      if (this.formGroup.invalid) {
        console.log('Formulário inválido!')
        this.formGroup.markAllAsTouched();
        this.showErrorMessages = true;
        return;
      }

      var tipojogo = new TipoJogoModel();

      tipojogo.tipo = this.formGroup.controls.tipo.value?.toString();
      tipojogo.descricao = this.formGroup.controls.descricao.value?.toString();
    
      this.tipojogoService.salvar(tipojogo).subscribe(tipojogo => {
        console.log('Tipo de jogo salvo com sucesso.')
        console.log(tipojogo)
        this.showSuccessMessages = true;
      }, error => {
        console.log(error);
        this.showErrorMessages = true;
      });

      console.log('Formulário válido');
    }
}

