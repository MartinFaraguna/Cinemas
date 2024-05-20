import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../shared/services/auth.service'
import { AlertService } from '../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

/**
 * @var loginForm
 * @var email
 * @var password
 *
 */

  loginForm: FormGroup;
  email: any;
  password: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertservice: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm=this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

/**
 * loginUser
 * @description llama al servicio de autenticacion para el login,utilizando el email y password
 * si el usuario es correcto redirecciona al home
 */
  async loginUser() {
    if(this.loginForm.valid){
      this.alertservice.showLoading();

      if(await this.authService.LoginUser(this.loginForm.value.email, this.loginForm.value.password)){
        this.loadingCtrl.dismiss();
        this.router.navigate(['/home']);
        localStorage.setItem('User',  this.loginForm.value.email.split('@')[0]);
        this.loginForm.setValue({email: '', password: ''});

      }else{
        this.loadingCtrl.dismiss();
        this.alertservice.Malcredenciales();
        this.loginForm.setValue({email: '', password: ''});
      }
    }
  }
}
