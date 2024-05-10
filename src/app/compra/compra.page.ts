import { Component } from '@angular/core';



@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage {

  constructor() { }

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

}
