import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos/service/pedidos.service';
import { PedidosModel } from '../pedidos/model/pedidos.model';
import { JogoModel } from '../jogo/model/jogo.model';
import { CarrinhoService } from '../carrinho.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioService } from '../usuario/service/usuario.service';
import { UsuarioModel } from '../usuario/model/usuario.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  carrinho: JogoModel[] = [];
  public usuario?: UsuarioModel;

  constructor(
    private pedidosService: PedidosService,
    private carrinhoService: CarrinhoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.jogos;
  }

  removerDoCarrinho(jogo: JogoModel): void {
    this.carrinhoService.removerDoCarrinho(jogo);
    const quantidade = jogo.quantidade ?? 0;
          if (quantidade > 0) {
            jogo.quantidade = quantidade + 1;
          }
  }

  continuarAlugando(): void {
    this.router.navigate(['/layout/dashboard'])
  }

  finalizarPedido(): void {
    this.afAuth.authState.subscribe(user => {
      if (!user || !user.email) {
        console.error('Usuário não autenticado.');
        return;
      }
      
      if (this.carrinho.length === 0) {
        alert('O carrinho está vazio.');
        return;
      }

      this.usuarioService.getUsuarioByEmail(user.email).subscribe(usuario => {
        if (!usuario) {
          console.error('Usuário não encontrado.');
          return;
        }

        const nomeUsuario = usuario.nome;
        const total = this.calcularValorTotal();
        const pedidoMensagem = this.carrinho
          .map(jogo => `${jogo.quantidade} ${jogo.nome} - R$ ${(jogo.preco ?? 0).toFixed(2)}`)
          .join('\n');
        const mensagem = `Compra confirmada! Obrigado, ${nomeUsuario}.\n\nJogos alugados:\n${pedidoMensagem}\n\nValor total: R$ ${total.toFixed(2)}`;

        for (const jogo of this.carrinho) {
          const quantidade = jogo.quantidade ?? 0;
          if (quantidade > 0) {
            const pedido: PedidosModel = {
              jogoKey: jogo.key,
              nomeJogo: jogo.nome,
              nomeUsuario: nomeUsuario,
              data: new Date(),
              quantidade: quantidade
            };
            jogo.quantidade = (jogo.quantidade ?? 0) - quantidade;

            this.pedidosService.registrarCompra(pedido).then(() => {
              console.log('Compra registrada:', pedido);
            });
          } else {
            alert(`Desculpe, o jogo ${jogo.nome} está fora de estoque.`);
          }
        }
        this.carrinhoService.limparCarrinho();
        alert(mensagem);
        this.router.navigate(['/layout/dashboard'])
      });
    }); 
  }

  calcularValorTotal(): number {
    let total = 0;
    for (const jogo of this.carrinho) {
      const preco = jogo.preco ?? 0;
      const quantidade = jogo.quantidade ?? 0;
      total += preco * quantidade;
    }
    return total;
  }
}
