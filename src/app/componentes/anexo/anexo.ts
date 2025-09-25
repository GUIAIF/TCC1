import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-anexo',
  standalone: false,
  templateUrl: './anexo.html',
  styleUrls: ['./anexo.css'],
  encapsulation: ViewEncapsulation.None
})
export class Anexo implements OnInit {
  isDark = false;
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  passoAtual: number = 0;
  instrucoes: string[] = [];

  // Rotas partindo do ANEXO
  rotas: { [key: string]: string[] } = {
    'Coord. de Lab.': [
      'Você está no Anexo.',
      'Siga em frente até encontrar a Coordenação de Laboratórios.'
    ],
    'CVT Espacial': [
      'Você está no Anexo.',
      'Vire à esquerda e ande por alguns metros.',
      'Você encontrará o CVT Espacial.'
    ],
    'Lab. Desenho Técnico': [
      'Você está no Anexo.',
      'Siga em frente até o Laboratório de Desenho Técnico.'
    ],
    'Lab. de Ensino Híbrido': [
      'Você está no Anexo.',
      'Entre no Laboratório de Ensino Híbrido, logo à frente.'
    ],
    'Lab. Instalações Elétricas': [
      'Você está no Anexo.',
      'Siga pelo corredor até chegar ao Laboratório de Instalações Elétricas.'
    ],
    'Lab. de Línguas': [
      'Você está no Anexo.',
      'Vire à direita e siga até o Laboratório de Línguas.'
    ],
    'Lab. para Pesquisadores': [
      'Você está no Anexo.',
      'Siga até o final do corredor para chegar ao Laboratório para Pesquisadores.'
    ],
    'Lab. de Projetos': [
      'Você está no Anexo.',
      'Siga até o Laboratório de Projetos, próximo ao Laboratório de Química.'
    ],
    'Lab. de Química': [
      'Você está no Anexo.',
      'Siga pelo corredor até o Laboratório de Química.'
    ],
    'NOCS Lab.': [
      'Você está no Anexo.',
      'Siga até o NOCS Lab.'
    ],
    'Sala de Atendimento ao Aluno 1': [
      'Você está no Anexo.',
      'Siga até a Sala de Atendimento ao Aluno 1, próxima à entrada.'
    ],
    'Sala de Atendimento ao Aluno 2': [
      'Você está no Anexo.',
      'Siga até a Sala de Atendimento ao Aluno 2, próxima à Sala de Atendimento ao Aluno 1.'
    ],
    'Sala B-12': [
      'Você está no Anexo.',
      'Siga pelo corredor até a sala B-12.'
    ],
    'Sala B-13': [
      'Você está no Anexo.',
      'Siga até a sala B-13.'
    ],
    'Sala B-14': [
      'Você está no Anexo.',
      'Siga até a sala B-14.'
    ],
    'Sala B-15': [
      'Você está no Anexo.',
      'Siga até a sala B-15.'
    ],
    'Sala B-16': [
      'Você está no Anexo.',
      'Siga até a sala B-16.'
    ],
    'Sala de Reuniões': [
      'Você está no Anexo.',
      'Siga até a Sala de Reuniões, próxima às salas finais.'
    ],
    'WC PCD Feminino': [
      'Você está no Anexo.',
      'Siga até o banheiro PCD Feminino, localizado no lado esquerdo do corredor.'
    ],
    'WC PCD Masculino': [
      'Você está no Anexo.',
      'Siga até o banheiro PCD Masculino, localizado no lado direito do corredor.'
    ],
  };

  constructor(private fb: FormBuilder) {}

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
