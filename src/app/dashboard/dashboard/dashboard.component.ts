import { Component } from '@angular/core';
import { JogoService } from '../../jogo/service/jogo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public jogos: any;

  constructor(private jogoService: JogoService,) { }

  ngOnInit(): void {
    this.jogoService.listar().subscribe(jogos => {
      console.log(jogos)
      this.jogos = jogos;
    });
  }

}
