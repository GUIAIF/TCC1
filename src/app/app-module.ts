import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './componentes/home/home';
import { Biblioteca } from './componentes/biblioteca/biblioteca';
import { Apoio } from './componentes/apoio/apoio';
import { Anexo } from './componentes/anexo/anexo';
import { Recepcao } from './componentes/recepcao/recepcao';

@NgModule({
  declarations: [
    App,
    Home,
    Biblioteca,
    Apoio,
    Anexo,
    Recepcao,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
