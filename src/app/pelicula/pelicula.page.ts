import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PelisService } from '../shared/services/pelis.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.page.html',
  styleUrls: ['./pelicula.page.scss'],
})
export class PeliculaPage implements OnInit{

  selectedMovie: any=null;
  title: string = '';
  overview: string = '';
  poster_path: string = '';
  runtime: string = '';
  constructor(
    private router: Router,
    private pelisService: PelisService
  ) { }

   ngOnInit() {
    const storedMovie = localStorage.getItem('movie');
    if (storedMovie) {
      this.selectedMovie = JSON.parse(storedMovie);
      this.title = this.selectedMovie.title;
      this.overview = this.selectedMovie.overview;
      this.poster_path = "https://image.tmdb.org/t/p/w500"+this.selectedMovie.poster_path;
      console.log(this.selectedMovie);

      this.pelisService.getDetalleMovie(this.selectedMovie.id).subscribe(data => {
        this.runtime = `${Math.floor(parseFloat(data.runtime)/60)}h ${parseFloat(data.runtime)%60}min`;
      });
    }
   }

  Comprar() {
    this.router.navigate(['/compra']);
  }
  Volver() {
    this.router.navigate(['/home']);
    localStorage.clear();
  }
  logout() {
    this.router.navigate(['/login']);
  }

}
