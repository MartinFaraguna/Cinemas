import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  /**
   * @var loginForm
   */
  RegistroForm: FormGroup;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertservice: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.RegistroForm=this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      passwordv:['',[Validators.required, Validators.minLength(6)]]
    })
  }



  async registerUser() {

    if (this.RegistroForm.value.password != this.RegistroForm.value.passwordv) {
      this.alertservice.presentAlertCoincidencia();
      this.RegistroForm.setValue({email: this.RegistroForm.value.email, password: '', passwordv: ''});
    }
    else {
        this.alertservice.showLoading();
        if(await this.authService.RegisterUser(this.RegistroForm.value.email,this.RegistroForm.value.password)){
          this.loadingCtrl.dismiss();
          this.router.navigate(['/login']);

        }else{
          this.loadingCtrl.dismiss();
          this.alertservice.Errorgeneric("Mail ya registrado verifique el correo");
        }
    }
  }
}
