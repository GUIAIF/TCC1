import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-apoio',
  standalone: false,
  templateUrl: './apoio.html',
  styleUrl: './apoio.css',
  encapsulation: ViewEncapsulation.None
})
export class Apoio implements OnInit {
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
      destino: ['/mapas-apoio/apoio.jpg']
    });

    this.imagemSelecionada = '/mapas-apoio/apoio.jpg';

    // Escuta mudanças no select
    this.form.get('destino')?.valueChanges.subscribe(valor => {
      if (valor !== 'null') {
        this.imagemSelecionada = valor;
      } else {
        this.imagemSelecionada = '';
      }
    });
  }
}
