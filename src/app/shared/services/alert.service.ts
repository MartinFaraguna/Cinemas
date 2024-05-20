import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  /**
   * @function showLoading
   * @desription muestra un loading
   */
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();
  }

  /**
   * @function Malcredenciales
   * @desription presenta una alerta de que las credenciales son incorrectas
   */
  async Malcredenciales() {
    const alert = await this.alertController.create({
      message: 'Credenciales Incorrectas. Por favor \n ingrese nuevamente',
      buttons: ['Cerrar'],
    });

    await alert.present();

  }

  /**
   * @function Errorgeneric
   * @param error recibe un string
   * @desription recibe un string que luego lo va a mostar en un alert
   */
  async Errorgeneric(error:string){
    const alert = await this.alertController.create({
      message: error,
      buttons: ['ok'],
    });

    await alert.present();
  }

  /**
   * @function presentAlertCoincidencia
   * @desription presenta una alerta de que las contraseñas no coinciden
   */
  async presentAlertCoincidencia() {
    const alert = await this.alertController.create({
      message: 'Las contraseñas no coinciden',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  /**
   * @function presentAlertResetemail
   * @desription presenta una alerta de que el correo fue enviado
   */
  async presentAlertResetemail() {
    const alert = await  this.alertController.create({
      header: 'Verificar Tu Correo',
      message: 'Mail enviado con link de cambio de password.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }

      }]
    });
    await alert.present();

  }
}
