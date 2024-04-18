import { Component, OnInit } from '@angular/core';


import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage  {

  constructor(private firebaseService: FirebaseService) {}

  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed up
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

  obtenerDatos() {
    this.firebaseService.getCollection('mi-coleccion').then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc['data']());
      });
    });
  }

  registrar(){
    this.firebaseService.register('pereiro.joel@gmail.com','112233')
  }



}
