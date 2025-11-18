import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private temaEscuro = false;

  constructor() {}

  alternarTema() {
    this.temaEscuro = !this.temaEscuro;
    this.aplicarTema();
  }

  aplicarTema() {
    if (this.temaEscuro) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  getTemaAtual() {
    return this.temaEscuro;
  }

  setTema(escuro: boolean) {
    this.temaEscuro = escuro;
    this.aplicarTema();
  }
}
