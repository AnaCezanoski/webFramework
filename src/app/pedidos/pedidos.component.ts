import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos/service/pedidos.service';
import { PedidosModel } from '../pedidos/model/pedidos.model';
import { JogoService } from '../jogo/service/jogo.service';
import { JogoModel } from '../jogo/model/jogo.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  jogos: JogoModel[] = [];
  nomeUsuario: string = '';

  constructor(
    private pedidosService: PedidosService,
    private jogoService: JogoService
  ) {}

  ngOnInit(): void {
    this.jogoService.listar().subscribe({
      next: (jogos: JogoModel[]) => {
        this.jogos = jogos.map(jogo => ({
          key: jogo.key ?? '',
          nome: jogo.nome,
          preco: jogo.preco,
          categoria: jogo.categoria,
          desc: jogo.desc,
          imagem: jogo.imagem,
          quantidade: jogo.quantidade
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar jogos:', error);
      }
    });
  }

  alugar(jogo: JogoModel): void {
    const nomeUsuario = this.nomeUsuario.trim();
    if (nomeUsuario) {
      const quantidade = jogo.quantidade ?? 0;
      if (quantidade > 0) {
        jogo.quantidade = quantidade - 1;
        const pedido: PedidosModel = {
          jogoKey: jogo.key,
          nomeJogo: jogo.nome,
          nomeUsuario: nomeUsuario,
          data: new Date(),
          quantidade: 1
        };
        this.pedidosService.registrarCompra(pedido)
          .then(() => {
            alert(`Compra confirmada! Obrigado, ${nomeUsuario}.`);
          })
          .catch(erro => {
            console.error('Erro ao registrar compra ou atualizar estoque:', erro);
            alert('Erro ao registrar compra ou atualizar estoque. Por favor, tente novamente.');
          });
      } else {
        alert('Desculpe, este produto está fora de estoque.');
      }
    } else {
      alert('Por favor, insira seu nome.');
    }
  }
}
