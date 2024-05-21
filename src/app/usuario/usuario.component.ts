import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from './model/usuario.model';
import { UsuarioService } from './service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'node:console';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    imagem: new FormControl('',[Validators.required]),
    dtNasc: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    confirmSenha: new FormControl('', [Validators.required]),
  });

  constructor(private usuarioService: UsuarioService, private router: ActivatedRoute, 
    public afAuth: AngularFireAuth, private route: Router) { }

  ngOnInit(): void { 
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.usuarioService.carregar(this.key).subscribe(usuario => {
          this.formGroup.controls.nome.patchValue(usuario.nome);
          this.formGroup.controls.imagem.patchValue(usuario.imagem);
          this.formGroup.controls.dtNasc.patchValue(usuario.dtNasc);
          this.formGroup.controls.email.patchValue(usuario.email);
          this.formGroup.controls.telefone.patchValue(usuario.telefone);
          this.formGroup.controls.cpf.patchValue(usuario.cpf);
          this.formGroup.controls.endereco.patchValue(usuario.endereco);
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

    var usuario = new UsuarioModel();
      usuario.nome = this.formGroup.controls.nome.value?.toString();
      usuario.imagem = this.formGroup.controls.imagem.value?.toString();
      usuario.dtNasc = this.formGroup.controls.dtNasc.value?.toString();
      usuario.email = this.formGroup.controls.email.value?.toString();
      usuario.telefone = this.formGroup.controls.telefone.value?.toString();
      usuario.cpf = this.formGroup.controls.cpf.value?.toString();
      usuario.endereco = this.formGroup.controls.endereco.value?.toString();
      usuario.senha = this.formGroup.controls.senha.value?.toString();
      

    if (this.key) {
      this.usuarioService.alterar(this.key, usuario).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      this.afAuth
      .createUserWithEmailAndPassword(usuario.email!, usuario.senha!)
      .then((result) => {
        this.verificarEmail();
        console.log(result.user)
        this.route.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
      this.usuarioService.salvar(usuario).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }

  verificarEmail() {
    this.afAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    .then(() => {
      window.alert("Um email de verificação foi enviado, verifique sua caixa de entrada")
    })
  }

  selectFile(event: any) {
    console.log(event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    this.usuarioService.uploadImagem(file).then(result => {
      console.log(result);
      result.ref.getDownloadURL().then(url => {
        this.formGroup.controls.imagem.patchValue(url);
      })
    });
  }
}