import { Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-apoio',
  standalone: false,
  templateUrl: './apoio.html',
  styleUrls: ['./apoio.css'],
  encapsulation: ViewEncapsulation.None
})
export class Apoio implements OnInit {
  title = signal('TCC');
  public mostrarAjuda = false;

  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  // Rotas partindo do Apoio Acadêmico
  rotas: { [key: string]: string[] } = {
    'A-1': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda e você chegará à sala A-1.'
    ],
    'A-2': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda.',
      'Dê 12 passos para a direita e você chegará à sala A-2.'
    ],
    'A-3': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda.',
      'Dê 14 passos para a direita e você chegará à sala A-3.'
    ],
    'A-4': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda.',
      'Dê 39 passos para a direita e você chegará à sala A-4.'
    ],
    'A-5': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda.',
      'Dê 41 passos para a direita e você chegará à sala A-5.'
    ],
    'A-6': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 22 passos para a direita',
      'Dê 41 passos para a esquerda e você chegará à sala A-6.'
    ],
    'A-7': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 22 passos para a direita',
      'Dê 39 passos para a esquerda e você chegará à sala A-7.'
    ],
    'A-8': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 22 passos para a direita',
      'Dê 14 passos para a esquerda e você chegará à sala A-8.'
    ],
     'A-9': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 22 passos para a direita',
      'Dê 12 passos para a esquerda e você chegará à sala A-9.'
    ],
    'A-10': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 22 passos para a direita e você chegará à sala A-10.'
    ],
    'Laboratórios': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda.',
      'Dê 39 passos para a direita',
      'Dê 2 passos para a direita e você chegará ao Corredor dos Laboratórios.'

    ],
    'Lab de Física': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a direita e você chegará ao Laboratório de Física.',
      
    ],
    'Lab de Biologia': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 14 passos para a direita e você chegará ao Laboratório de Biologia.',
    ],
    'WC PCD Feminino': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 12 passos para a esquerda.',
      'Dê 12 passos para a direita e você chegará ao banheiro PCD Feminino.'
    ],
    'WC PCD Masculino': [
      'Você está no Mapa Tátil do Apoio Acadêmico.',
      'Dê 22 passos para a direita',
      'Dê 12 passos para a esquerda e você chegará ao banheiro PCD Masculino.'
    ],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destino: [''] // começa vazio → mostra "Selecione o destino"
    });

    // imagem inicial (padrão)
    this.imagemSelecionada = '/mapas-apoio/apoio.jpg';

    // quando o select mudar
    this.form.get('destino')?.valueChanges.subscribe(valor => {
      if (valor && valor !== '') {
        this.imagemSelecionada = valor;
        const nomeDestino = this.pegarNomeDestino(valor);
        this.instrucoes = this.rotas[nomeDestino] || [];
        this.passoAtual = 0;
      } else {
        // volta para a imagem inicial
        this.imagemSelecionada = '/mapas-apoio/apoio.jpg';
        this.instrucoes = [];
        this.passoAtual = 0;
      }
    });
  }

  private pegarNomeDestino(valor: string): string {
    const v = valor.toLowerCase();
    if (v.includes('ida-sala01')) return 'A-1';
    if (v.includes('ida-sala02')) return 'A-2';
    if (v.includes('ida-sala03')) return 'A-3';
    if (v.includes('ida-sala04')) return 'A-4';
    if (v.includes('ida-sala05')) return 'A-5';
    if (v.includes('ida-sala06')) return 'A-6';
    if (v.includes('ida-sala07')) return 'A-7';
    if (v.includes('ida-sala08')) return 'A-8';
    if (v.includes('ida-sala09')) return 'A-9';
    if (v.includes('ida-sala10')) return 'A-10'
    if (v.includes('ida-labs')) return 'Laboratórios';
    if (v.includes('labfisica')) return 'Lab de Física';
    if (v.includes('labbiologia')) return 'Lab de Biologia';
    if (v.includes('ida-wcpdfem')) return 'WC PCD Feminino';
    if (v.includes('ida-wcpdmas')) return 'WC PCD Masculino';
    if (v.includes('apoio')) return 'Apoio Acadêmico';
    return '';
  }

  private falar(texto: string): void {
    if (!('speechSynthesis' in window)) return;
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
    if (this.isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
