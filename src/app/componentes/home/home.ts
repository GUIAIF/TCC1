import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css'], // ⚠️ Corrigido: era "styleUrl", deve ser "styleUrls"
  encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit {
  isDark = false;

  title = signal('TCC');
  public mostrarAjuda = false;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destino: [''] // começa vazio
    });

    //  FALA AUTOMÁTICA AO ABRIR A TELA
    this.falar('Você está no GUIA IF. Selecione uma das opções do centro da tela e escolha o seu destino.');
  }

  private falar(texto: string): void {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis não suportado');
      return;
    }

    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'pt-BR';
    msg.rate = 1;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
  }

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}