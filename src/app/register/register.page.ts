import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  account = {} as any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertservice: AlertService
  ) {}



  async registerUser() {

    if (this.account.password != this.account.passwordV) {
      this.alertservice.presentAlertCoincidencia();
      this.account.password = '';
      this.account.passwordV = '';
    }
    else {
        this.alertservice.showLoading();
        if(await this.authService.RegisterUser(this.account.email, this.account.password)){
          this.loadingCtrl.dismiss();
          this.router.navigate(['/login']);

        }else{
          this.loadingCtrl.dismiss();
          this.alertservice.Errorgeneric();
        }
    }
  }
}
