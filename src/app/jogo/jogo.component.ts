import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JogoService } from './service/jogo.service';
import { JogoModel } from './model/jogo.model';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.css'
})
export class JogoComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    categoria: new FormControl(''),
    desc: new FormControl('', [Validators.required]),
    imagem: new FormControl('', [Validators.required]),
  });

  constructor(private jogoService: JogoService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.jogoService.carregar(this.key).subscribe(jogo => {
          this.formGroup.controls.nome.patchValue(jogo.nome);
          this.formGroup.controls.preco.patchValue(jogo.preco);
          this.formGroup.controls.categoria.patchValue(jogo.categoria);
          this.formGroup.controls.desc.patchValue(jogo.desc);
          this.formGroup.controls.imagem.patchValue(jogo.imagem);
        });
      }
    })
  }

  salvar(): void {
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
      jogo.imagem = this.formGroup.controls.imagem.value?.toString();

    if (this.key) {
      this.jogoService.alterar(this.key, jogo).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      this.jogoService.salvar(jogo).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }
}
