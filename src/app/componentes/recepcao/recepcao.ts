import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-recepcao',
  standalone: false,
  templateUrl: './recepcao.html',
  styleUrl: './recepcao.css',
  encapsulation: ViewEncapsulation.None
})

export class Recepcao implements OnInit {
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;

    // Adiciona ou remove a classe "dark" no <body>
    if (this.isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  
  form!: FormGroup;
  imagemSelecionada: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destino: ['/mapas-recepcao/Principal.jpg']
    });

    this.imagemSelecionada = '/mapas-recepcao/Principal.jpg';

    // Escuta mudanças no select
    this.form.get('destino')?.valueChanges.subscribe(valor => {
      if (valor !== 'null') {
        this.imagemSelecionada = valor;
      } else {
        this.imagemSelecionada = '/mapas-recepcao/Principal.jpg';
      }
    });
  }
}
