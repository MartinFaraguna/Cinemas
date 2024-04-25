import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { initializeApp } from 'firebase/app';

import { getAuth,sendPasswordResetEmail } from "firebase/auth";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {
  // Initialize Firebase
  app = initializeApp(environment.firebase);
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth();

  constructor(
    private alertController: AlertController
  ) { }

  email=""

  alertButtons = ['Action'];

  async presentAlert() {
    const alert = await  this.alertController.create({
      header: 'Verificar Tu Correo',
      message: 'Mail enviado con link de cambio de password.',
      buttons: this.alertButtons // Asegúrate de definir alertButtons en tu componente
    });
    await alert.present();
  }

  sendPasswordResetEmail(): void {

    sendPasswordResetEmail(this.auth, this.email)
      .then(() => {

        this.presentAlert();

        this.email = '';

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        console.log(errorCode);
        console.log(errorMessage);
      });
  }

}
