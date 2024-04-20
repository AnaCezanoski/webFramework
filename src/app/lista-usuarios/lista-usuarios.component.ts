import { Component, OnInit } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario.component';
import { UsuarioService } from '../usuario/service/usuario.service';
import { UsuarioModel } from '../usuario/model/usuario.model';
import { error } from 'console';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  public usuarios: any;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(usuarios => {
      console.log(usuarios);      
      this.usuarios = usuarios;
    });
  }

  excluir(key: any) {
    console.log(key);
    this.usuarioService.excluir(key).then(retorno => {
      console.log(retorno);
    });
  }

  carregar(key: any) {
    this.router.navigate(['/layout/usuario/'+key]);
  }
}
