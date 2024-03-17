import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'jogo', component: JogoComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'layout',
    component: LayoutComponent,
    children:[
      { path: 'usuario', component: UsuarioComponent },
  { path: 'jogo', component: JogoComponent }, 
    ]},  
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
