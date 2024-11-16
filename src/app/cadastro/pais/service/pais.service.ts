import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pais {
  id?: number;
  nome: string;
  sigla: string;
  codigo: string;
}

@Injectable({
  providedIn: 'root'
})

export class PaisService {
  private apiUrl = 'https://api.exemplo.com/paises';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl);
  }

  getPais(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }

  createPais(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais);
  }

  updatePais(pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${pais.id}`, pais);
  }

  deletePais(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}