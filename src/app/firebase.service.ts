import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AutheticationService } from './authetication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestore: AngularFirestore,
   public authservice: AutheticationService,
   private afAuth: AngularFireAuth

  ) { 


  }


  async agregarLibro(libro: any): Promise<any> {
    // Obtener el ID del usuario actual
    const idUsuario = await this.obtenerIdUsuarioActual();
  
    // Agregar el libro a la colección "Libros" con el ID del usuario como campo de propietario
    return this.firestore.collection('Libros').add({
      Nombre: libro.itemName,
      Categoria: libro.itemCategory,
      Descripcion: libro.itemDescription,
      Ubicacion: libro.itemLocation,
      Fechafinal: libro.itemDueDate,
      Fechadeinicio: libro.itemInitialDate,
      Compartido: libro.isNewlyShared,
      Comentarios: libro.comments,
      Propetario: idUsuario // Usar el ID del usuario como valor del campo Propetario
    });
  }
  async agregarUsuario(newUser: any): Promise<any> {

    const idUsuario = await this.obtenerIdUsuarioActual();
  
    return this.firestore.collection('Usuarios').doc(idUsuario).set(newUser);
  }


  async obtenerIdUsuarioActual() {
    const usuario = await this.authservice.getProfile();
    if (usuario) {
      const idUsuario = usuario.uid;
      return idUsuario;
    } else {
      return null;
    }
  }

  deleteBook(bookId: string) {
    return this.firestore.collection('Libros').doc(bookId).delete();
  }

}


