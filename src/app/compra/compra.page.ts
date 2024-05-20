import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdfGeneratorService } from '../shared/services/pdf-generador.service';
import { Platform } from '@ionic/angular';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage {

  /**
   * @var cantidadcombo
   * @var cantidadpochoclo
   * @var cantidadbebida
   * @description Cantidad de combos , pochoclos y bebidas que se van a comprar
   */
  cantidadcombo: number = 0;
  cantidadpochoclo: number = 0;
  cantidadbebida: number = 0;

  /**
   * @var isToastOpen
   * @description Variable para controlar el toast que iforma que realizo la compra
   */
  isToastOpen: boolean=false;

  /**
   * @var butacas
   * @var kandy
   * @description Variables para controlar en la web para mostarlas seciones de compra de butacas y kandy
   */
  public butacas: boolean = false;
  public kandy: boolean = true;

  /**
   * @var seats
   * @description Lista de butacas es la que se va a mostrar
   */
  seats: string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6',
                     'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
                     'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
                     'D1', 'D2', 'D3', 'D4', 'D5', 'D6'];

  /**
  * @var selectedSeats
  * @description Lista de butacas seleccionadas
  */
  selectedSeats: string[] = [];

  constructor( private router: Router,
               private pdfGenerator: PdfGeneratorService
  ) { }

  /**
   * @param seat
   * @description al seleccionar la butaca y se fija si esta en la lista de butacas seleccionas y
   * cambia de color a rojo para que no se pueda seleccionar de nuevo y retorna color de la butaca
   * danger para Butaca seleccionada y success para butaca disponible
   */
  getSeatColor(seat: string): string {
    if (this.selectedSeats.includes(seat)) {
      return 'danger';
    } else {
      return 'success';
    }
  }

  /**
   * @param seat
   * @description selecciona o deselecciona la butaca
   */
  selectSeat(seat: string): void {
    if (!this.selectedSeats.includes(seat)) {
      this.selectedSeats.push(seat); // Agregar butaca seleccionada
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat); // Deseleccionar butaca
    }
  }

  /**
   * @description cambia de vista de compra de butacas y kandy
   * ocutala la vista de butacas y muestra la de kandy
   */
  ComprarButacas(){
    this.butacas = !this.butacas;
    this.kandy = !this.kandy
  }

  /**
   * @description redirige a la vista de la pelicula donde esta el detallado de la pelicula
   */
  VolverPelicula() {
    this.router.navigate(['/pelicula']);
    localStorage.clear();
  }

  /**
   *
   * @param tipo combo, pochoclo o bebida
   * @param cantidad
   * @description aumenta  la cantidad de combos , pochoclos y bebidas
   */
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

  /**
   *
   * @param tipo combo, pochoclo o bebida
   * @param cantidad
   * @description disminuye la cantidad de combos , pochoclos y bebidas
   */
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

  Ticket(){
    this.pdfGenerator.generateAndSavePdf();
    this.isToastOpen=true;
  }
}
