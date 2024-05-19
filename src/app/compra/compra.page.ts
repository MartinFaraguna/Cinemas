import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage {

  cantidadcombo: number = 0;
  cantidadpochoclo: number = 0;
  cantidadbebida: number = 0;

  constructor( private router: Router) { }

  public butacas: boolean = false;
  public kandy: boolean = true;

  seats: string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6',
                     'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
                     'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
                     'D1', 'D2', 'D3', 'D4', 'D5', 'D6']; // Ejemplo de butacas
  selectedSeats: string[] = [];

  getSeatColor(seat: string): string {
    if (this.selectedSeats.includes(seat)) {
      return 'danger'; // Butaca seleccionada
    } else {
      return 'success'; // Butaca disponible
    }
  }

  selectSeat(seat: string): void {
    if (!this.selectedSeats.includes(seat)) {
      this.selectedSeats.push(seat); // Agregar butaca seleccionada
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat); // Deseleccionar butaca
    }
  }

  ComprarButacas(){
    this.butacas = !this.butacas;
    this.kandy = !this.kandy
  }

  Volver() {
    this.router.navigate(['/pelicula']);
    localStorage.clear();
  }

  Mas(tipo:string,cantidad:number){

    if(tipo == 'cantidadcombo'){
      this.cantidadcombo = cantidad + 1
    }
    if(tipo == 'cantidadpochoclo'){
      this.cantidadpochoclo = cantidad + 1
    }
    if(tipo == 'cantidadbebida'){
      this.cantidadbebida = cantidad + 1
    }
  }
  Menos(tipo:string,cantidad:number){
    if(cantidad > 0){
      if(tipo == 'cantidadcombo'){
        this.cantidadcombo = cantidad - 1
      }
      if(tipo == 'cantidadpochoclo'){
        this.cantidadpochoclo = cantidad - 1
      }
      if(tipo == 'cantidadbebida'){
        this.cantidadbebida = cantidad - 1
      }
    }
  }
}
