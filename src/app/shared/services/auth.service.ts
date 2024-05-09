import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword,  getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( ) { }

  // Initialize Firebase
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);

/**
 * @function LoginUser
 * @param email
 * @param password
 * @desription realiza la autenticacion del usaurio recibiendo los parametros de email y password dando como resultado true o folse
 *
 */
  async LoginUser(email :string, password:string): Promise<boolean> {
    let conecto:boolean=false;

     await signInWithEmailAndPassword(this.auth, email, password)
    .then(() => {
      conecto = true;
    })
    .catch(() => {
      conecto=false;
    });
    return conecto;

  }

  async RegisterUser(email: string, password: string): Promise<boolean> {
    let conecto:boolean=false;

    await createUserWithEmailAndPassword(this.auth,email,password)
      .then(() => {
        conecto = true;
      })
      .catch((error) => {
        conecto=false;
      });
    return conecto;
  }

  async forgot(email:string):Promise<boolean>{
    let conecto:boolean=false;

    await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        conecto=true;
      })
      .catch((error) => {
        conecto=false;
      });
    return conecto
  }
}
