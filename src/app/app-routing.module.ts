import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { EstoqueComponent } from './estoque/estoque.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'layout', component: LayoutComponent,
    children:[
      { path: 'estoque', component: EstoqueComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'jogo', component: JogoComponent }, 
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
