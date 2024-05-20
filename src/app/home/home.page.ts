import { Component, OnInit } from '@angular/core';
import { PelisService } from '../shared/services/pelis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  /**
   * @var popularMovies: any[]
   */
  popularMovies: any[] = [];


  constructor( private pelisService: PelisService,
                private router: Router
  ) {}

  ngOnInit() {
    this.pelisService.getPopularMovies().subscribe(data => {
      this.popularMovies = data.results;
    });
  }


  /**   *
   * @param posterPath string
   * @description Retorna la URL completa de la imagen o se rellena con una imagen de relleno
   */
  getImageUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'assets/placeholder.jpg'; // Puedes usar una imagen de relleno en caso de que la película no tenga póster
    }
  }

  /**
   * @description redirige al login
   */
  logout() {
    this.router.navigate(['/login']);
  }

  /**
   * @param movie: any
   * @description redirige a la pagina de la pelicula
   * y almacena la pelicula en el local storage
   */
  openDetails(movie: any) {
    this.router.navigate(['/pelicula']);
    localStorage.setItem('movie', JSON.stringify(movie));
    localStorage.setItem('moviebk', JSON.stringify(movie));
  }
}
