import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword,  getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( ) { }

  /**
   * @description se inicializa firebase para poder realizar las consultas a firebase en
   *              enveronment carga la caonfiguracion para la conexion a firebase
   * @var app
   * @var auth
   *
   */
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);

/**
 * @function LoginUser
 * @param email
 * @param password
 * @desription realiza la autenticacion del usaurio recibiendo los parametros de email y password
 * dando como resultado true o false y se guarda el token en localStorage
 */
async  LoginUser(email :string, password:string): Promise<boolean> {
    let conecto:boolean=false;
    let token:  string='';

    try{
      await signInWithEmailAndPassword(this.auth, email, password)
    .then(async (data) => {
      conecto = true;
      token = (await data.user.getIdTokenResult()).token.toString();
      localStorage.setItem('token',token);
    })
    .catch(() => {
      conecto=false;
    });
    return conecto;

    }
    catch(error){;
      console.log(error);
     return conecto;
    }

  }

  /**
   * @function RegisterUser
   * @param email
   * @param password
   * @description registra un nuevo usuario en firebase pasando el email y password
   */
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

  /**
   * @function forgot
   * @param email
   * @descripcion envia un email para restablecer la contraseña
   */
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
