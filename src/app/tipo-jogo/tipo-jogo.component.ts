import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoJogoService } from './service/tipo-jogo.service';
import { TipoJogoModel } from './model/tipo-jogo.model';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-jogo',
  templateUrl: './tipo-jogo.component.html',
  styleUrl: './tipo-jogo.component.css'
})
export class TipoJogoComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  formGroup = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
  });

  constructor(private tipoJogoService: TipoJogoService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.tipoJogoService.carregar(this.key).subscribe(tipoJogo => {
          this.formGroup.controls.tipo.patchValue(tipoJogo.tipo);
          this.formGroup.controls.descricao.patchValue(tipoJogo.descricao);
        })
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
      
      var tipojogo = new TipoJogoModel();
      tipojogo.tipo = this.formGroup.controls.tipo.value?.toString();
      tipojogo.descricao = this.formGroup.controls.descricao.value?.toString();

    if (this.key) {
      this.tipoJogoService.alterar(this.key, tipojogo).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      this.tipoJogoService.salvar(tipojogo).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }
}

