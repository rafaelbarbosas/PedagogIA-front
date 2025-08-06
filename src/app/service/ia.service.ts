import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IaService {
  private URL_API = environment.urlApi;

  constructor(private http: HttpClient) {}

  async gerarExercicio(promptUsuario: string): Promise<string> {
    const body = { prompt: promptUsuario };

    const response = await firstValueFrom(
      this.http.post<{ resposta: string }>(`${this.URL_API}/gerar`, body)
    );

    return response.resposta;
  }

}
