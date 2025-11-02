import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-recepcao',
  standalone: false,
  templateUrl: './recepcao.html',
  styleUrls: ['./recepcao.css'],
  encapsulation: ViewEncapsulation.None
})

export class Recepcao implements OnInit {
  title = signal('TCC');
  public mostrarAjuda = false;

  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  rotas: { [key: string]: string[] } = {
    'Auditório': [
      'Você está no mapa Tátil da recepção.',
      'Dê 4 passos para esquerda.',
      'Dê 12 passos para esquerda e você chegará ao auditório.',
    ],
    'WC Masculino': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 12 passos para esquerda.',
      'Dê 39 passos para a direita',
      'Dê 4 passos para a esquerda e você chegará ao banheiro masculino.'

    ],
    'WC Feminino': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 12 passos para esquerda.',
      'Dê 39 passos para a direita',
      'Dê 6 passos para a esquerda e você chegará ao banheiro feminino.'
    ],
    'WC PCD Masculino': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 12 passos para esquerda.',
      'Dê 26 passos para a direita e você chegará ao banheiro PCD masculino.'

    ],
    'WC PCD Feminino': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 12 passos para esquerda.',
      'Dê 39 passos para a direita',
      'Dê 9 passos para a esquerda',
      'Dê 13 passos para a esquerda e você chegará ao banheiro PCD feminino.'
      
    ],
    'Sala dos Professores': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 12 passos para esquerda.',
      'Dê 10 passos para a direita e você chegará à sala dos professores.'
    ],
    'Mapa Tátil': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 12 passos para esquerda.',
      'Dê 39 passos para a direita',
      'Dê 3 passos para a direita e você chegará ao Mapa Tátil da Biblioteca.'
    ],
    'Secretaria Acadêmica': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 5 passos para a direita e você chegará à Secretaria Acadêmica.'
    ],
    'Direção Geral': [
      'Você está no Mapa Tátil da recepção.',
      'Dê 4 passos para esquerda',
      'Dê 6 passos para a direita e você chegará à Direção Geral.'
    ],
    'Recepção': [
      'Você está no Mapa Tátil da recepção',
      'Dê 4 passos para esquerda e você estará na Recepção.'
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destino: ['']
    });

    this.imagemSelecionada = '/mapas-recepcao/Principal.jpg';

    this.form.get('destino')?.valueChanges.subscribe(valor => {
      if (valor && valor !== '') {
        this.imagemSelecionada = valor;
        const nomeDestino = this.pegarNomeDestino(valor);
        this.instrucoes = this.rotas[nomeDestino] || [];
        this.passoAtual = 0;
      } else {
        this.imagemSelecionada = '/mapas-recepcao/Principal.jpg';
        this.instrucoes = [];
        this.passoAtual = 0;
      }
    });
  }

  private pegarNomeDestino(valor: string): string {
  const v = valor.toLowerCase();

  if (v.includes('auditorio.jpg')) return 'Auditório';
  if (v.includes('banheiro-f.jpg')) return 'WC Feminino';
  if (v.includes('banheiro-m.jpg')) return 'WC Masculino';
  if (v.includes('banheiro-pcd-f.jpg')) return 'WC PCD Feminino';
  if (v.includes('banheiro-pcd-m.jpg')) return 'WC PCD Masculino';
  if (v.includes('direção.jpg') || v.includes('direcao.jpg')) return 'Direção Geral';
  if (v.includes('mapa-tátil.jpg') || v.includes('mapa-til.jpg') || v.includes('mapa-tatil.jpg')) return 'Mapa Tátil';
  if (v.includes('principal.jpg')) return 'Recepção';
  if (v.includes('sala-professores.jpg')) return 'Sala dos Professores';
  if (v.includes('secretaria.jpg')) return 'Secretaria Acadêmica';
  if (v.includes('recepção.jpg') || v.includes('recepcao.jpg')) return 'Recepção';

  return '';
}


  private falar(texto: string): void {
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
}
