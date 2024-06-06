import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from './model/usuario.model';
import { UsuarioService } from './service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  showSuccessMessages = false;
  showErrorMessages = false;
  errorMessage = '';
  isEditMode = false;

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
        this.isEditMode = true;
        this.usuarioService.carregar(this.key).subscribe(usuario => {
          const { senha, confirmSenha, ...controles } = this.formGroup.controls;
          
          const newControls = {
            ...controles,
            senha: new FormControl(''),
            confirmSenha: new FormControl('')
          };
  
          this.formGroup = new FormGroup(newControls);
  
          this.formGroup.patchValue({
            nome: usuario.nome,
            imagem: usuario.imagem,
            dtNasc: usuario.dtNasc,
            email: usuario.email,
            telefone: usuario.telefone,
            cpf: usuario.cpf,
            endereco: usuario.endereco
          });
        });
      }
    })
  }    

  salvar(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      this.errorMessage = 'Formulário inválido!';
      return;
    }

    if (this.isEditMode) {
      var usuario = new UsuarioModel();
      usuario.nome = this.formGroup.controls.nome.value?.toString();
      usuario.imagem = this.formGroup.controls.imagem.value?.toString();
      usuario.dtNasc = this.formGroup.controls.dtNasc.value?.toString();
      usuario.email = this.formGroup.controls.email.value?.toString();
      usuario.telefone = this.formGroup.controls.telefone.value?.toString();
      usuario.cpf = this.formGroup.controls.cpf.value?.toString();
      usuario.endereco = this.formGroup.controls.endereco.value?.toString();

      this.usuarioService.alterar(this.key!, usuario).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      if (this.formGroup.controls.senha.value !== this.formGroup.controls.confirmSenha.value) {
        this.showErrorMessages = true;
        this.errorMessage = 'As senhas não são iguais';
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

      this.afAuth.createUserWithEmailAndPassword(usuario.email!, usuario.senha!)
      .then((result) => {
        this.verificarEmail();
        console.log(result.user)
        this.route.navigate(['/']);
        this.usuarioService.salvar(usuario).then(result => {
          this.showSuccessMessages = true;
          console.log(result);
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          this.showErrorMessages = true;
          this.errorMessage = 'Este e-mail já está registrado.';
        } else {
          this.showErrorMessages = true;
          this.errorMessage = 'Erro ao cadastrar usuário: ' + error.message;
        }
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