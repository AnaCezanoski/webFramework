import { Component, OnInit } from '@angular/core';
import { TipoJogoModel } from '../tipo-jogo/model/tipo-jogo.model';
import { TipoJogoService } from '../tipo-jogo/service/tipo-jogo.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-tipos',
  templateUrl: './lista-tipos.component.html',
  styleUrl: './lista-tipos.component.css'
})
export class ListaTiposComponent implements OnInit {

  public tipos: any;

  constructor(private tipojogoService: TipoJogoService, private router: Router) { }

  ngOnInit(): void {
    this.tipojogoService.listar().subscribe(tipos => {
      this.tipos = tipos;
      console.log(tipos)
    });
  }

  excluir(key: any) {
    console.log(key);
    this.tipojogoService.excluir(key).then(retorno => {
      console.log(retorno);
    });
  }

  carregar(key: any) {
    this.router.navigate(['/layout/tipo-jogo/'+key]);
  }
}
