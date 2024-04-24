import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  loginUser() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.router.navigate(['/home']);
        console.log(user);

        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
      });
  }
}
