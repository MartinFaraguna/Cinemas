import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  app = initializeApp(environment.firebase);
  auth = getAuth();

  account = {} as any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  registerUser() {
    this.showLoading();
    if (this.account.password != this.account.passwordV) {
      console.log('Las contraseñas no coinciden');
      this.loadingCtrl.dismiss();
      this.presentAlertCoincidencia();
    } else {
      createUserWithEmailAndPassword(
        this.auth,
        this.account.email,
        this.account.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          this.loadingCtrl.dismiss();
          this.router.navigate(['/home']);
          console.log(user);
          this.loadingCtrl.dismiss();
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);          
          console.log(errorMessage);
          this.loadingCtrl.dismiss();
          this.presentAlert();

          // ..
        });
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();
  }

  async presentAlertCoincidencia() {
    const alert = await this.alertController.create({
      message: 'Las contraseñas no coinciden',
      buttons: ['Action'],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Error',
      buttons: ['Action'],
    });

    await alert.present();
  }
}
