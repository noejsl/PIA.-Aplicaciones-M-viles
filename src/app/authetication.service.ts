import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngFireAuth: AngularFireAuth) { }


  async registerUser(email: string, password: string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)

    
  }

  async loginUser(email: string, password: string){

    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  async resetPassword(email: string){

    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(): Promise<User | null> {
    return await this.ngFireAuth.currentUser;
  }

  async obtenerIdUsuarioActual() {
    const usuario = await this.getProfile();
    if (usuario) {
      const idUsuario = usuario.uid;
      console.log("ID de usuario actual:", idUsuario);
      return idUsuario;
    } else {
      console.log("No hay usuario autenticado.");
      return null;
    }
  }
  
  
  

}
