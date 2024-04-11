import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JogoService } from './service/jogo.service';
import { JogoModel } from './model/jogo.model';
import { error } from 'console';

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


  constructor(private jogoService: JogoService) { }

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
        console.log('Formulário Inválido!')
        this.formGroup.markAllAsTouched();
        this.showErrorMessages = true;
        return;
      }

      var jogo = new JogoModel();

      jogo.nome = this.formGroup.controls.nome.value?.toString();
      jogo.preco = this.formGroup.controls.preco.value?.toString();
      jogo.categoria = this.formGroup.controls.categoria.value?.toString();
      jogo.desc = this.formGroup.controls.desc.value?.toString();
      jogo.cover = this.formGroup.controls.cover.value?.toString();
    
      this.jogoService.salvar(jogo).subscribe(jogo => {
        console.log('Jogo salvo com sucesso')
        console.log(jogo)
        this.showSuccessMessages = true;
      }, error => {
        console.log(error);
        this.showErrorMessages = true;
      })

      console.log('Formulário válido');
    }
}
