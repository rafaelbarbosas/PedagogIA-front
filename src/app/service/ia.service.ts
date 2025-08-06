import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { RunPodOutput, RunPodResponse } from '../models/RunPodResponse';
import { prompt1 } from './prompts';

@Injectable({ providedIn: 'root' })
export class IaService {
  private API_URL = environment.apiUrl;
  private API_KEY = environment.token;

  constructor(private http: HttpClient) {}

  extrairTextoChoices(output: RunPodOutput): string {
    return output.choices.map(choice => choice.text.trim()).join('\n\n');
  }

  async gerarExercicio(promptUsuario: string): Promise<string> {
    const contexto = prompt1(promptUsuario);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY}`
    });

    const body = { input: { prompt: contexto } };

    // Primeira requisição
    const submission: RunPodResponse = await firstValueFrom(
      this.http.post<RunPodResponse>(`${this.API_URL}/run`, body, { headers })
    );
    const requestId = submission.id;

    // Verifica status a cada 2 segundos
    return await firstValueFrom(
      timer(0, 2000).pipe(
        switchMap(() => this.http.get<RunPodResponse>(
          `${this.API_URL}/status/${requestId}`, { headers })
        ),
        takeWhile((res: RunPodResponse) => res.status !== 'COMPLETED', true),
        switchMap((res: RunPodResponse) => {
          if (res.status === 'COMPLETED') {
            return res.output;
          } else if (res.status === 'FAILED') {
            throw new Error('Falha na execução do modelo.');
          }
          return [];
        })
      )
    ).then((output: RunPodOutput) => this.extrairTextoChoices(output));
  }
}

