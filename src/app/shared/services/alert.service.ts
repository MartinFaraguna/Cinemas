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


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();
  }

  async Malcredenciales() {
    const alert = await this.alertController.create({
      message: 'Credenciales Incorrectas. Por favor \n ingrese nuevamente',
      buttons: ['Cerrar'],
    });

    await alert.present();

  }

  async Errorgeneric(){
    const alert = await this.alertController.create({
      message: 'Error',
      buttons: ['Action'],
    });

    await alert.present();
  }

  async presentAlertCoincidencia() {
    const alert = await this.alertController.create({
      message: 'Las contraseñas no coinciden',
      buttons: ['Action'],
    });

    await alert.present();
  }

  async presentAlertResetemail() {
    const alert = await  this.alertController.create({
      header: 'Verificar Tu Correo',
      message: 'Mail enviado con link de cambio de password.',
      buttons: [
        {
          text: 'Action',
          handler: () => {
            this.router.navigate(['/login']);
          }

      }]
    });
    await alert.present();

  }
}
