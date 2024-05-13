import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../pages/add-new-book/models/libro.model';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  
  @Input() ID: any;
  
  Comments: Comment[] = [];
  newMessage: string = '';
  currentUserUID: string;
  constructor(
    public firebase: FirebaseService,
    public modalCtrl: ModalController,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit() {
      
      this.getAllComments();
     
  
  }


  

  public async getAllComments(){
    try {
      this.currentUserUID = await this.firebase.obtenerIdUsuarioActual();
      let tempComments: Comment[] = []; // Array temporal para almacenar los comentarios

      this.firestore.collection('Comentario', ref => ref.where('Libro', '==', this.ID)).snapshotChanges().subscribe(data => {
        tempComments = data.map(e => {
          const commentData = e.payload.doc.data();
          const comment: Comment = {
            itemComment: commentData['Comentario'] || '',
            itemBook: commentData['Libro'] || '',
            itemSender: commentData['Usuario'] || '',
            itemDate: commentData['Fecha'] || ''
          };
          this.firestore.collection('Usuarios').doc(commentData['Usuario']).get().subscribe(userSnapshot => {
            comment.itemSender = userSnapshot.data()['itemName'];
          });
          return comment;
        });

        // Ordenar los comentarios por fecha de manera descendente
        tempComments.sort((a, b) => (a.itemDate > b.itemDate) ? -1 : 1);

        // Asignar los comentarios ordenados a Comments
        this.Comments = tempComments;
      });
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  }
  
  public async agregarComentario() {
    try {
      if (!this.newMessage || this.newMessage.trim().length === 0) {
        console.log('Debes escribir al menos un carácter antes de enviar el comentario.');
        return;
      }

      const usuarioId = await this.firebase.obtenerIdUsuarioActual();
      await this.firestore.collection('Comentario').add({
        Comentario: this.newMessage,
        Libro: this.ID,
        Usuario: usuarioId,
        Fecha: new Date()
      });
      console.log('Comentario agregado con éxito.');
      this.newMessage = ''; // Borra el contenido del input después de enviar el comentario
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  }
}
