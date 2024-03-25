import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'layout', component: LayoutComponent,
    children:[
      { path: 'usuario', component: UsuarioComponent },
      { path: 'jogo', component: JogoComponent }, 
      { path: 'lista-usuario', component: ListaUsuarioComponent }, 
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
