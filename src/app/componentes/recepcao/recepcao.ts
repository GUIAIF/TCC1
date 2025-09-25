import { Component, OnInit } from '@angular/core';
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
  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  rotas: { [key: string]: string[] } = {
    'Auditório': [
      'Você está na recepção.',
      'Siga em frente por 5 metros.',
      'O auditório estará à sua esquerda.'
    ],
    'WC Masculino': [
      'Você está na recepção.',
      'Siga em frente até o corredor principal.',
      'Vire à direita e ande por 10 metros.',
      'O banheiro masculino estará à sua esquerda.'
    ],
    'WC Feminino': [
      'Você está na recepção.',
      'Siga em frente até o corredor principal.',
      'Vire à direita e ande por 15 metros.',
      'O banheiro feminino estará ao fundo.'
    ],
    'WC PCD Masculino': [
      'Você está na recepção.',
      'Siga em frente até o corredor principal.',
      'Vire à direita e ande por 8 metros.',
      'O WC PCD masculino estará à direita.'
    ],
    'WC PCD Feminino': [
      'Você está na recepção.',
      'Siga em frente até o corredor principal.',
      'Vire à direita e ande por 12 metros.',
      'O WC PCD feminino estará ao fundo.'
    ],
    'Sala dos Professores': [
      'Você está na recepção.',
      'Vire à esquerda após 5 metros.',
      'A sala dos professores estará logo à frente.'
    ],
    'Mapa Tátil': [
      'Você está na recepção.',
      'Siga em frente até o corredor principal.',
      'Vire à direita e ande por 20 metros.',
      'O mapa tátil estará no final do corredor.'
    ],
    'Secretaria Acadêmica': [
      'Você está na recepção.',
      'Vire à direita e caminhe por 6 metros.',
      'A secretaria acadêmica estará à sua esquerda.'
    ],
    'Direção Geral': [
      'Você está na recepção.',
      'Vire à direita e caminhe por 12 metros.',
      'A direção geral estará no final do corredor.'
    ],
    'Recepção': [
      'Você já está na recepção.'
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destino: [''] // começa vazio → placeholder aparece
    });

    this.imagemSelecionada = '/mapas-recepcao/Principal.jpg';

    this.form.get('destino')?.valueChanges.subscribe(valor => {
      if (valor && valor !== '') {
        this.imagemSelecionada = valor;
        const nomeDestino = this.pegarNomeDestino(valor);
        this.instrucoes = this.rotas[nomeDestino] || [];
        this.passoAtual = 0;
      } else {
        // voltou ao "Selecione o destino"
        this.imagemSelecionada = '/mapas-recepcao/Principal.jpg';
        this.instrucoes = [];
        this.passoAtual = 0;
      }
    });
  }

  private pegarNomeDestino(valor: string): string {
    const v = valor.toLowerCase();
    if (v.includes('auditorio')) return 'Auditório';
    if (v.includes('direcao')) return 'Direção Geral';
    if (v.includes('mapa')) return 'Mapa Tátil';
    if (v.includes('recepcao')) return 'Recepção';
    if (v.includes('sala-professores')) return 'Sala dos Professores';
    if (v.includes('secretaria')) return 'Secretaria Acadêmica';
    if (v.includes('banheiro-f')) return 'WC Feminino';
    if (v.includes('banheiro-m.jpg')) return 'WC Masculino';
    if (v.includes('banheiro-pcd-f')) return 'WC PCD Feminino';
    if (v.includes('banheiro-pcd-m')) return 'WC PCD Masculino';
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
