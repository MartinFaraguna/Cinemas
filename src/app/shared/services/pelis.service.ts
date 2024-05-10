import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PelisService {

  //private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmYwMjliYzg2NWFhMmMwNzVkNGY4ZWY4NThkZDIzMyIsInN1YiI6IjY2MmJlNDY0MjBlNmE1MDEyODkyNDQ4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1v5LBE79hbwrukhumVU2zbtX9DX-1CDIDeSwv3yW5F0'; // Reemplaza con tu API Key de TMDb
  private apiKey= '86f029bc865aa2c075d4f8ef858dd233';
  private apiUrl = 'https://api.themoviedb.org/3';


  constructor(private http: HttpClient) { }

  //Metodo crear guest session
  getcreateGuestSession(): Observable<any> {
    //Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get(`${this.apiUrl}/authentication/guest_session/new`,{headers: headers});
  }

  //Metodo para obtener token de acceso
  getToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`);

  }

  // Método para obtener la lista de películas populares
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?language=es-ar&page=1&api_key=${this.apiKey}`);
  }

  getDetalleMovie(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?language=es-ar&api_key=${this.apiKey}`);
  }
}
