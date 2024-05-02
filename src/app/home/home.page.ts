import { Component, OnInit } from '@angular/core';
import { PelisService } from '../shared/services/pelis.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  popularMovies: any[] = [];

  constructor( private pelisService: PelisService) {}

  ngOnInit() {
    this.pelisService.getPopularMovies().subscribe(data => {
      this.popularMovies = data.results; // 'results' contiene la lista de películas populares en la respuesta de la API
    });
  }


  obtenerPeliculas() {
    this.pelisService.getPopularMovies().subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  // Método para obtener la URL completa de la imagen de la película
  getImageUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'assets/placeholder.jpg'; // Puedes usar una imagen de relleno en caso de que la película no tenga póster
    }
  }

}
