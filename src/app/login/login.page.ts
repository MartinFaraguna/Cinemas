import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../shared/services/auth.service'
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

/**
 * @descripcion email y password son varibles para el login
 */
  email = '';
  password = '';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertservice: AlertService
  ) {}

/**
 * @Fuction loginUser
 * @description
 */
  async loginUser() {

    this.alertservice.showLoading();

    if(await this.authService.LoginUser(this.email, this.password)){
      this.loadingCtrl.dismiss();
      this.router.navigate(['/home']);
      this.email = '';
      this.password = '';
    }else{
      this.loadingCtrl.dismiss();
      this.alertservice.Malcredenciales();
      this.email = '';
      this.password = '';
    }
  }
}
