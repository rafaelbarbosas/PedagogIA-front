import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

import { IaService } from './service/ia.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  promptUsuario = '';
  respostaIA = '';
  carregando = false;

  constructor(
    private iaService: IaService,
    private sanitizer: DomSanitizer
  ) {}

  async gerar() {
    this.carregando = true;
    this.respostaIA = '';
    try {
      this.respostaIA = await this.iaService.gerarExercicio(this.promptUsuario);
    } catch (err) {
      this.respostaIA = 'Erro ao gerar exercício. Tente novamente.';
    } finally {
      this.carregando = false;
    }
  }

  get textoFormatado(): SafeHtml {
    const html = marked.parse(this.respostaIA || '', { async: false }) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
