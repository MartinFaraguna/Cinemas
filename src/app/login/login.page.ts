import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Initialize Firebase
  app = initializeApp(environment.firebase);
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(this.app);

  email = '';
  password = '';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  loginUser() {
    this.showLoading();
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        this.loadingCtrl.dismiss();
        const user = userCredential.user;
        this.router.navigate(['/home']);
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        console.log(error.message);
        this.loadingCtrl.dismiss();
        this.presentAlert();
      });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Credenciales Incorrectas. Por favor \n ingrese nuevamente',
      buttons: ['Cerrar'],
    });

    await alert.present();
    
  }
}
