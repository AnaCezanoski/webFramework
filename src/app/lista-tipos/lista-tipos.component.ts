import { Component, OnInit } from '@angular/core';
import { TipoJogoModel } from '../tipo-jogo/model/tipo-jogo.model';
import { TipoJogoService } from '../tipo-jogo/service/tipo-jogo.service';
import { error } from 'console';

@Component({
  selector: 'app-lista-tipos',
  templateUrl: './lista-tipos.component.html',
  styleUrl: './lista-tipos.component.css'
})
export class ListaTiposComponent implements OnInit {

  public tipos: TipoJogoModel[] = [];

  constructor(private tipojogoService: TipoJogoService) { }

  ngOnInit(): void {
    this.tipojogoService.listar().subscribe(tipos => {
      this.tipos = tipos;
      console.log(tipos)
    }, error => {
      console.error = error;
    })
  }
}
