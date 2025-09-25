import { Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})


export class Home {
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
}
