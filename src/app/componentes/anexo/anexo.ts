import { Component, OnInit, ViewEncapsulation, signal} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TemaService } from '../../tema.service';

@Component({
  selector: 'app-anexo',
  standalone: false,
  templateUrl: './anexo.html',
  styleUrls: ['./anexo.css'],
  encapsulation: ViewEncapsulation.None
})

export class Anexo implements OnInit {
  title = signal('TCC');
  public mostrarAjuda = false;

  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  constructor(private fb: FormBuilder, private temaService: TemaService) {}

  // Rotas partindo do ANEXO
  rotas: { [key: string]: string[] } = {
    'Coord. de Lab.': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 40 passos para a direita e você chegará à Coordenação de Laboratórios.'

    ],
    'CVT Espacial': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 39 passos à esquerda e você encontrará o CVT Espacial.'
    ],
    'Lab. Desenho Técnico': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 41 passos à esquerda',
      'Dê 4 passos à esquerda e você chegará ao Laboratório de Desenho Técnico.'
    ],
    'Lab. de Ensino Híbrido': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda e você chegará ao Laboratório de Ensino Híbrido.'
    ],
    'Lab. Instalações Elétricas': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 41 passos à esquerda',
      'Dê 21 passos à esquerda e você chegará ao Laboratório de Instalações Elétricas.'
    ],
    'Lab. de Línguas': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 8 passos à esquerda e você chegará ao Laboratório de Línguas.'
    ],
    'Lab. para Pesquisadores': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 28 passos para a direita e você chegará ao Laboratório para Pesquisadores.'
    ],
    'Lab. de Projetos': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 40 passos para a direita',
      'Dê 4 passos para a esquerda e você chegará ao Laboratório de Projetos.'
    ],
    'Lab. de Química': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 40 passos para a direita',
      'Dê 21 passos para a direita',
      'Dê 13 passos para a esquerda',
      'Dê 4 passos para a direita',
      'Dê 4 passos para a direita novamente e você chegará ao Laboratório de Química.'
    ],
    'NOCS Lab.': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 28 passos à esquerda e você chegará ao NOCS Lab.'
    ],
    'Sala de Atendimento ao Aluno 1': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 12 passos para à direita e você chegará á primeira Sala de Atendimento ao Aluno.'
    ],
    'Sala de Atendimento ao Aluno 2': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 16 passos para a esquerda e você chegará á segunda Sala de Atendimento ao Aluno.'
    ],
    'Sala B-12': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 9 passos para a direita e você chegará à sala B-12.'
    ],
    'Sala B-13': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 26 passos para a direita e você chegará à sala B-13.'
    ],
    'Sala B-14': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 26 passos à esquerda e você chegará à sala B-14.'
    ],
    'Sala B-15': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita.',
      'Dê 9 passos à esquerda e você chegará à sala B-15.'
    ],
    'Sala B-16': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 14 passos à direita e você chegará à sala B-16.'
    ],
    'Sala de Reuniões': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 8 passos para a direita e você chegará à Sala de Reuniões.'
    ],
    'WC PCD Feminino': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 40 passos para a direita',
      'Dê 21 passos para a direita',
      'Dê 13 passos para a esquerda',
      'Dê 14 passos para a esquerda',
      'Dê 2 passos para a direita e você chegará ao banheiro PCD Feminino.'
    ],
    'WC PCD Masculino': [
      'Você está no Mapa Tátil do Anexo.',
      'Dê 2 passos para esquerda',
      'Dê 21 passos para a esquerda.',
      'Dê 40 passos para a direita',
      'Dê 21 passos para a direita',
      'Dê 13 passos para a esquerda',
      'Dê 4 passos para a direita',
      'Dê 7 passos para a esquerda e você chegará ao banheiro PCD Masculino.'
    ],
  };

  ngOnInit() {
    this.form = this.fb.group({
      destino: [''] // começa vazio → mostra "Selecione o destino"
    });

    // imagem inicial (padrão)
    this.imagemSelecionada = '/mapas-anexo/Anexo.jpg';

    this.form.get('destino')?.valueChanges.subscribe(valor => {
      if (valor && valor !== '') {
        // Aqui pegamos o nome do arquivo (sem o caminho completo)
        const nomeDestino = this.pegarNomeDestino(valor); // Ex: 'Coord. de Lab.'
        this.imagemSelecionada = valor;
        this.instrucoes = this.rotas[nomeDestino] || [];
        this.passoAtual = 0;
      } else {
        this.imagemSelecionada = '/mapas-anexo/Anexo.jpg';
        this.instrucoes = [];
        this.passoAtual = 0;
      }
    });
  }

  // Agora, o método pegarNomeDestino analisa a imagem e devolve o nome correto
  private pegarNomeDestino(valor: string): string {
    // Aqui extraímos o nome da imagem para comparar com as rotas
    const nomeArquivo = valor.split('/').pop()?.replace('.jpg', '') || '';

    // Matchando a imagem com as chaves das rotas
    switch (nomeArquivo) {
      case 'Coord. De Lab': return 'Coord. de Lab.';
      case 'CVT Espacial': return 'CVT Espacial';
      case 'Lab. Desenho Técnico': return 'Lab. Desenho Técnico';
      case 'Laboratório de ensino híbrido': return 'Lab. de Ensino Híbrido';
      case 'Lab. Instalações Elétricas': return 'Lab. Instalações Elétricas';
      case 'Lab. De Línguas': return 'Lab. de Línguas';
      case 'Lab. Para Pesquisadores': return 'Lab. para Pesquisadores';
      case 'Lab. Projetos': return 'Lab. de Projetos';
      case 'Lab. Química': return 'Lab. de Química';
      case 'Nocs Lab': return 'NOCS Lab.';
      case 'Salas de atendimento a alunos': return 'Sala de Atendimento ao Aluno 1';
      case 'Salas de atendimento a alunos 2': return 'Sala de Atendimento ao Aluno 2';
      case 'Sala B-12': return 'Sala B-12';
      case 'Sala B-13': return 'Sala B-13';
      case 'Sala B-14': return 'Sala B-14';
      case 'Sala B-15': return 'Sala B-15';
      case 'Sala B-16': return 'Sala B-16';
      case 'Sala de Reuniões': return 'Sala de Reuniões';
      case 'Banheiro Feminino': return 'WC PCD Feminino';
      case 'Banheiro Masculino': return 'WC PCD Masculino';
      default: return '';
    }
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
