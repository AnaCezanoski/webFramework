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
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: 'layout', component: LayoutComponent,
    children:[
      { path: 'home-page', component: HomePageComponent},
      { path: 'login', component: LoginComponent},
      { path: 'estoque', component: EstoqueComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'jogo', component: JogoComponent }, 
      { path: 'lista-tipos', component: ListaTiposComponent }, 
      { path: 'lista-usuarios', component: ListaUsuariosComponent }, 
      { path: 'tipo-jogo', component: TipoJogoComponent }, 
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
