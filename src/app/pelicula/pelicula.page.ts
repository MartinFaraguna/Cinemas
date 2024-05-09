import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router
  ) { }

   ngOnInit() {
    const storedMovie = localStorage.getItem('movie');
    if (storedMovie) {
      this.selectedMovie = JSON.parse(storedMovie);
      this.title = this.selectedMovie.title;
      this.overview = this.selectedMovie.overview;
      this.poster_path = "https://image.tmdb.org/t/p/w500"+this.selectedMovie.poster_path;
      console.log(this.selectedMovie);
    }
   }

  logout() {
    this.router.navigate(['/login']);
  }

}
