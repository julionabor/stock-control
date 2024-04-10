import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stock';

  constructor(private primeConfig: PrimeNGConfig) {}
  ngOnInit(): void {
    this.primeConfig.ripple = true;
    this.primeConfig.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar',
    });
  }
}
