import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JogoService } from './service/jogo.service';
import { JogoModel } from './model/jogo.model';
import { ActivatedRoute } from '@angular/router';
import { TipoJogoModel } from '../tipo-jogo/model/tipo-jogo.model';
import { TipoJogoService } from '../tipo-jogo/service/tipo-jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.css'
})
export class JogoComponent implements OnInit, JogoModel {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  tipoJogos: TipoJogoModel[] = [];
  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    categoria: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    imagem: new FormControl('', [Validators.required]),
    arquivo: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
  });

  constructor(
    private jogoService: JogoService, 
    private router: ActivatedRoute, 
    private tipoJogoService: TipoJogoService
  ) { }

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
          this.formGroup.controls.quantidade.patchValue(jogo.quantidade);
        });
      }
    });
    this.tipoJogoService.listar().subscribe(data => {
      this.tipoJogos = data;
    });
  }

  salvar(): void {
    if (this.formGroup.invalid) {
      console.log('Formulário Inválido!')
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }
  
    const jogo: JogoModel = {
      nome: this.formGroup.controls.nome.value?.toString(),
      preco: parseFloat(this.formGroup.controls.preco.value!.toString()),
      categoria: this.formGroup.controls.categoria.value?.toString(),
      desc: this.formGroup.controls.desc.value?.toString(),
      imagem: this.formGroup.controls.imagem.value?.toString(),
      quantidade: parseInt(this.formGroup.controls.quantidade.value!, 10)
    };

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
  
  selectFile(event: any) {
    console.log(event);
    const file = event.target.files[0];

    if (!file) {
      this.formGroup.controls.arquivo.setErrors({ required: true });
      return;
    }

    this.jogoService.uploadImagem(file).then(result => {
      console.log(result)
      result.ref.getDownloadURL().then(url => {
        this.formGroup.controls.imagem.patchValue(url);
        this.formGroup.controls.arquivo.setErrors(null);
        this.formGroup.controls.arquivo.markAsTouched();
      })
    })
  }
}