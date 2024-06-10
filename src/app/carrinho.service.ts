import { Injectable } from '@angular/core';
import { JogoModel } from './jogo/model/jogo.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  jogos: JogoModel[] = [];

  adicionarAoCarrinho(jogo: JogoModel): void {
    const jogoExistente = this.jogos.find(j => j.key === jogo.key);
    if (jogoExistente) {
      if (jogoExistente.quantidade !== undefined) {
        jogoExistente.quantidade++;
      }
    } else {
      this.jogos.push({ ...jogo, quantidade: 1 });
    }
  }

  limparCarrinho(): void {
    this.jogos = [];
  }

  removerDoCarrinho(jogo: JogoModel): void {
    const index = this.jogos.findIndex(j => j.key === jogo.key);
    if (index !== -1) {
      this.jogos.splice(index, 1);
    }
  }
}
