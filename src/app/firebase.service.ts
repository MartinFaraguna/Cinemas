import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, collection, getDocs  } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private app: any;
  private db: Firestore;

  constructor() {
    // Verifica si ya existe una instancia de la aplicación de Firebase
    if (!initializeApp.length) {
      this.app = initializeApp(environment.firebaseConfig);
    }
    // Inicializa Firestore con la instancia de la aplicación
    this.db = getFirestore(this.app);
  }

  // Métodos para interactuar con Firestore
  async getCollection(collectionPath: string) {
    const colRef = collection(this.db, collectionPath);
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map(doc => doc.data());
  }

  async register(email: string, password: string) {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado con éxito:', userCredential.user);
      // Aquí puedes manejar la lógica post-registro, como redirigir al usuario o guardar datos adicionales.
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Aquí puedes manejar los errores, como mostrar un mensaje al usuario.
    }
  }
}
