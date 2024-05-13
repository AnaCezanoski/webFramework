import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { JogoComponent } from './jogo/jogo.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { TipoJogoComponent } from './tipo-jogo/tipo-jogo.component';
import { ListaTiposComponent } from './lista-tipos/lista-tipos.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    JogoComponent,
    LayoutComponent,
    LoginComponent,
    EstoqueComponent,
    ListaUsuariosComponent,
    TipoJogoComponent,
    ListaTiposComponent,
    HomePageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
