import { Component, OnInit } from '@angular/core';
import { JogoModel } from '../jogo/model/jogo.model';
import { JogoService } from '../jogo/service/jogo.service';
import { error } from 'console';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {

  public jogos: any;

  constructor(private jogoService: JogoService, private router: Router) { }

  ngOnInit(): void {
    this.jogoService.listar().subscribe(jogos => {
      this.jogos = jogos;
      console.log(jogos)
    });
  }

  excluir(key: any) {
    console.log(key);
    this.jogoService.excluir(key).then(retorno => {
      console.log(retorno);
    });
  }

  editar(key: any) {
    this.router.navigate(['/layout/jogo/'+key]);
  }
}
