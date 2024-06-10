import { Component, OnInit } from '@angular/core';
import { JogoService } from '../../jogo/service/jogo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { JogoModel } from '../../jogo/model/jogo.model';
import { CarrinhoService } from '../../carrinho.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  jogos: JogoModel[] = [];

  constructor(
    private jogoService: JogoService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.jogoService.listar().subscribe((jogos: JogoModel[]) => {
      console.log(jogos)
      this.jogos = jogos;
    });
  }

  pedir(jogo: JogoModel): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.carrinhoService.adicionarAoCarrinho(jogo);
        this.router.navigate(['layout/pedidos'])
      } else {
        this.router.navigate(['layout/login']);
      }
    });
  }
}