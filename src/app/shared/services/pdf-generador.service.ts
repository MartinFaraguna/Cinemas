import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor(
               private platform: Platform
) { }

  /**
   * @method generatePdf
   * @param cantidaddeentradas
   * @param cantidadcombo
   * @param cantidadpochoclo
   * @param cantidadbebida
   * @param totalgasto
   * @param Ubicaciones
   * @description Arma el documento el pdf
   *
   */
  generatePdf(cantidaddeentradas: number,cantidadcombo: number,cantidadpochoclo: number,cantidadbebida: number,totalgasto: number,Ubicaciones:string[]) {
    const docDefinition = {
      content: [
        { text: 'Factura', style: 'header' },
        { text: 'CineMas', style: 'subheader'},
        { text: 'Fecha: ' + new Date().toLocaleDateString(), style: 'normal'},
        { text: ' ' }, // Espacio en blanco
        {
          columns: [
            [
              { text: 'Nombre del Cliente: ' +localStorage.getItem('User'), style: 'normal' },
            ],
            [
              { text: 'Factura No: '+ Math.floor(Math.random() * 1000), style: 'normal' },
              { text: 'Vendedor: Online', style: 'normal' },
            ],
          ],
        },
        { text: ' ' }, // Espacio en Blanco
        {
          columns: [
            [
              { text: 'Ubicaciones: ' +Ubicaciones.join(', '), style: 'normal' },
            ],
          ],
        },
        { text: ' ' }, // Espacio en Blanco
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Descripción', style: 'tableHeader' },
                { text: 'Cantidad', style: 'tableHeader' },
                { text: 'Precio Unitario', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' }],
              ['Entrada Cine', cantidaddeentradas, '$700.00', cantidaddeentradas*700],
              ['Combos',cantidadcombo, '$125.00', cantidadcombo*125],
              ['Pochoclos', cantidadpochoclo, '$150.00', cantidadpochoclo*150],
              ['Bebida', cantidadbebida, '$150.00', cantidadbebida*150],
            ]
          }
        },
        { text: ' ' }, // Espacio en blanco
        {
          columns: [
            { text: ' ' },
            {
              table: {
                body: [
                  [{ text: 'Total', bold: true }, { text: '$' + totalgasto}],
                ]
              },
              layout: 'noBorders',
            }
          ]
        },
        { text: ' ' }, // Espacio en blanco
        { text: 'Gracias por su compra!', style: 'subheader' },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        subheader: {
          fontSize: 18,
          bold: true,
        },
        normal: {
          fontSize: 12,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        }
      }
    };
    return pdfMake.createPdf(docDefinition);
  }

  /**
   * @param cantidadentradas
   * @param cantidadcombo
   * @param cantidadpochoclo
   * @param cantidadbebida
   * @param totalgasto
   * @param Ubicaciones
   * @description llama al generador de pdf y descarga el pdf
   */
  generateAndSavePdf(cantidadentradas:number, cantidadcombo:number, cantidadpochoclo:number, cantidadbebida:number,totalgasto:number,Ubicaciones:string[]) {
    const pdf = this.generatePdf(cantidadentradas, cantidadcombo, cantidadpochoclo, cantidadbebida, totalgasto,Ubicaciones);
    pdf.getBase64(async (base64Data: string) => {
      const fileName = 'Ticket.pdf';
      const saveLocation = Directory.Documents;

      try {
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: saveLocation,
          encoding: Encoding.UTF8,
        });

        if (this.platform.is('android') || this.platform.is('ios')) {
          this.showSaveDialog(fileName, base64Data);

        } else {
          alert('PDF guardado con éxito.');
        }
      } catch (error) {
        console.error('Error al guardar el archivo', error);
      }
    });

  }

  /**
   *
   * @param fileName
   * @param base64Data
   * @description muestra el dialogo de guardado
   */
  async showSaveDialog(fileName: string, base64Data: string) {
    const blob = this.base64ToBlob(base64Data, 'application/pdf');
    const file = new File([blob], fileName, { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /**
   *
   * @param base64
   * @param type
   * @description convierte una base64 a blob
   */

  base64ToBlob(base64: string, type: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  }

}
