import { Component, OnInit } from '@angular/core';
import { JogoModel } from '../jogo/model/jogo.model';
import { JogoService } from '../jogo/service/jogo.service';
import { error } from 'console';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {

  public jogos: JogoModel[] = [];

  constructor(private jogoService: JogoService) { }

  ngOnInit(): void {
    this.jogoService.listar().subscribe(jogos => {
      this.jogos = jogos;
      console.log(jogos)
    }, error => {
      console.error = error;
    })
  }
}
