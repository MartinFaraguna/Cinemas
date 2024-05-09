import { Component } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {


  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  email=""

  async sendPasswordResetEmail(): Promise<void> {

    if(await this.authService.forgot(this.email)){
      this.alertService.presentAlertResetemail()
      this.email=""
    }else{
      this.alertService.Errorgeneric()
      this.email=""
    }
  }

}
