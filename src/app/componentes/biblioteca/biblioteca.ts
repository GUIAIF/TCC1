import { Component, OnInit, signal } from '@angular/core';
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
  title = signal('TCC');
  public mostrarAjuda = false;
  
  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  // Rotas partindo da BIBLIOTECA
  rotas: { [key: string]: string[] } = {
    'Laboratório informática 3': [
      'Você está no Mapa Tátil da biblioteca, clique para continuar',
      'Dê 12 passos para a direita, clique para continuar',
      'Dê 33 passos para a esquerda e você chegará ao Laboratório de Informática 3.'
    ],
    'Laboratório informática 4': [
      'Você está no Mapa Tátil da biblioteca, clique para continuar',
      'Dê 12 passos para a direita, clique para continuar',
      'Dê 27 passos para a esquerda e você chegará ao Laboratório de Informática 4.'
    ],
    'Mapa Tátil': [
      'Você está no Mapa Tátil da biblioteca, clique para continuar',
      'Dê 12 passos para a direita, clique para continuar',
      'Dê 30 passos para a esquerda, clique para continuar',
      'Dê 22 passos para a esquerda e você chegará ao Mapa Tátil do Apoio.'
    ],
    'Serviço Social': [
      'Você está no Mapa Tátil da biblioteca, clique para continuar',
      'Dê 12 passos para a direita, clique para continuar',
      'Dê 3 passos para a esquerda e você chegará ao Serviço Social.'
    ],
    'Biblioteca': [
      'Você está no Mapa Tátil da biblioteca, clique para continuar',
      'Dê 7 passos para a direita e você chegará na Biblioteca.'
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
    if (v.includes('ida-mapatatil')) return 'Mapa Tátil';
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