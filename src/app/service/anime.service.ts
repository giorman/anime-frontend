import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../model/anime';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private endpoint: string = 'http://localhost:8080/animes/';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  });

  constructor(private http: HttpClient) {}

  consultar(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.endpoint}consultar`);
  }

  guardar(anime: Anime): Observable<Anime> {
    return this.http.post<Anime>(`${this.endpoint}guardar`, anime, {
      headers: this.headers,
    });
  }
  actualizar(anime: Anime): Observable<Anime> {
    return this.http.put<Anime>(`${this.endpoint}actualizar`, anime, {
      headers: this.headers,
    });
  }

  eliminar(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}eliminar/${id}`);
  }
}
