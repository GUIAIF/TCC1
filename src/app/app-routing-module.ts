import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Recepcao } from './componentes/recepcao/recepcao';
import { Home } from './componentes/home/home';
import { Biblioteca } from './componentes/biblioteca/biblioteca';
import { Apoio } from './componentes/apoio/apoio';
import { Anexo } from './componentes/anexo/anexo';

const routes: Routes = [
  {path: '', component: Home},
  {path: 'anexo', component: Anexo},
  {path: 'apoio', component: Apoio},
  {path: 'biblioteca', component: Biblioteca},
  {path: 'recepcao', component: Recepcao}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
