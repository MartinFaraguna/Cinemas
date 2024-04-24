import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  auth = getAuth();

  account = {} as any;

  constructor(private router: Router) {}

  ngOnInit() {}

  registerUser() {
    console.log(this.account);

    if (this.account.password != this.account.passwordV) {
      console.log('Contraseña Incorrecta');
    } else {
      createUserWithEmailAndPassword(
        this.auth,
        this.account.email,
        this.account.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          this.router.navigate(["/home"]);
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);

          // ..
        });
    }
  }
}
