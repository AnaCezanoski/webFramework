import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { ListaTiposComponent } from './lista-tipos/lista-tipos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { TipoJogoComponent } from './tipo-jogo/tipo-jogo.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'layout', component: LayoutComponent,
    children:[
      { path: 'estoque', component: EstoqueComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'usuario/:key', component: UsuarioComponent },
      { path: 'jogo', component: JogoComponent },
      { path: 'jogo/:key', component: JogoComponent},
      { path: 'lista-tipos', component: ListaTiposComponent },
      { path: 'lista-usuarios', component: ListaUsuariosComponent },
      { path: 'tipo-jogo', component: TipoJogoComponent },
      { path: 'tipo-jogo/:key', component: TipoJogoComponent},
      { path: 'login', component: LoginComponent },
    ]
  },        
    { path: '', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
    ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
