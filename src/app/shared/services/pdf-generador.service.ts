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
   * @description Arma el documento el pdf
   *
   */
  generatePdf() {
    const docDefinition = {
      content: [
        { text: 'This is a sample PDF generated using pdfMake in Ionic!', style: 'header' },
        { text: 'This is normal paragraph text', style: 'normal' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        normal: {
          fontSize: 12,
        }
      }
    };
    return pdfMake.createPdf(docDefinition);
  }

  /**
   * @description llama al generador de pdf y descarga el pdf
   */
  generateAndSavePdf() {
    const pdf = this.generatePdf();
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
