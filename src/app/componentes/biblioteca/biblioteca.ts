import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-biblioteca',
  standalone: false,
  templateUrl: './biblioteca.html',
  styleUrls: ['./biblioteca.css'],
  encapsulation: ViewEncapsulation.None
})
export class Biblioteca implements OnInit {
  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  // Rotas partindo da BIBLIOTECA
  rotas: { [key: string]: string[] } = {
    'Laboratório informática 3': [
      'Você está ',
      'Saia pela porta principal.',
      'Vire à esquerda e ande por 10 metros.',
      'O Laboratório de Informática 3 estará à sua frente.'
    ],
    'Laboratório informática 4': [
      'Você está ',
      'Saia pela porta principal.',
      'Vire à direita e ande por 8 metros.',
      'O Laboratório de Informática 4 estará logo adiante.'
    ],
    'Mapa Tátil': [
      'Você está ',
      'Saia pela porta principal.',
      'Ande em frente por 15 metros.',
      'O mapa tátil estará ao seu lado direito.'
    ],
    'Serviço Social': [
      'Você está na ',
      'Saia pela porta principal.',
      'Vire à esquerda e ande por 12 metros.',
      'O Serviço Social estará à esquerda.'
    ],
    'Setor de Saúde': [
      'Você está ',
      'Saia pela porta principal.',
      'Vire à direita e ande por 20 metros.',
      'O Setor de Saúde estará no final do corredor.'
    ],
    'Biblioteca': [
      'Você já está na Biblioteca.',
      'ande 2 metros'
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destino: [''] // começa vazio → placeholder aparece
    });

    // imagem inicial (padrão)
    this.imagemSelecionada = '/mapas-biblioteca/Biblioteca.jpg';

    console.log('Biblioteca component init ->', this.imagemSelecionada);

    this.form.get('destino')?.valueChanges.subscribe(valor => {
      console.log('select mudou para:', valor);

      if (valor && valor !== '') {
        this.imagemSelecionada = valor;
        const nomeDestino = this.pegarNomeDestino(valor);
        this.instrucoes = this.rotas[nomeDestino] || [];
        this.passoAtual = 0;
        console.log('Destino reconhecido:', nomeDestino, 'Instruções:', this.instrucoes);
      } else {
        // volta ao padrão
        this.imagemSelecionada = '/mapas-biblioteca/Biblioteca.jpg';
        this.instrucoes = [];
        this.passoAtual = 0;
      }
    });
  }

  private pegarNomeDestino(valor: string): string {
    const v = valor.toLowerCase();
    if (v.includes('ida-biblioteca') || v.includes('Biblioteca'))return 'Biblioteca';
    if (v.includes('ida-lab3')) return 'Laboratório informática 3';
    if (v.includes('ida-lab4')) return 'Laboratório informática 4';
    if (v.includes('ida-mapatatil') || v.includes('mapa')) return 'Mapa Tátil';
    if (v.includes('ida-servicosocial') || v.includes('servico')) return 'Serviço Social';
    if (v.includes('ida-setorsaude') || v.includes('setor')) return 'Setor de Saúde';
    return '';
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

  public narrarProximoPasso(): void {
    if (this.instrucoes.length > 0 && this.passoAtual < this.instrucoes.length) {
      this.falar(this.instrucoes[this.passoAtual]);
      this.passoAtual++;
    }
  }

  public reiniciarRota(): void {
    this.passoAtual = 0;
    window.speechSynthesis.cancel();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }
}
