import { Component } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {

  /**
   * @var forgotPasswordForm
   */
  forgotPasswordForm: FormGroup;


  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.forgotPasswordForm=this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]]
    })
   }



  async sendPasswordResetEmail(): Promise<void> {

    if(await this.authService.forgot(this.forgotPasswordForm.value.email)){
      this.alertService.presentAlertResetemail()
      this.forgotPasswordForm.setValue({email: ''});
    }else{
      this.alertService.Errorgeneric("Verificar correo no registrado")
      this.forgotPasswordForm.setValue({email: ''});
    }
  }

}
