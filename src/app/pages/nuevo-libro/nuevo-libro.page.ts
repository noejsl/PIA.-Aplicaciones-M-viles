import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Libro } from './models/model.libro';
import { HomePage } from 'src/app/home/home.page';
import { AddNewBookPage } from '../add-new-book/add-new-book.page';
import { TodoService } from 'src/app/todo.service';
import { NotificationService } from 'src/app/notification.service';
import { UpdatebookPage } from '../updatebook/updatebook.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.page.html',
  styleUrls: ['./nuevo-libro.page.scss'],
})
export class NuevoLibroPage implements OnInit {
  todoList: Libro[] = []; // Inicializa todoList como un arreglo de objetos Libro

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService,
    public notificationService: NotificationService,
    public firebase: FirebaseService,
    public firestore: AngularFirestore
  ) {
    this.getAllBook();
  }

  async addBook(){
    const modal = await this.modalCtrl.create({
      component: AddNewBookPage
    });

    modal.onDidDismiss().then(() => {
      this.getAllBook();
    });

    return await modal.present();
  }

  async getAllBook() {
    try {
      const userId = await this.firebase.obtenerIdUsuarioActual();
      if (!userId) {
        console.error("No hay usuario autenticado.");
        return;
      }
      this.firestore.collection('Libros', ref => ref.where('Propetario', '==', userId)).snapshotChanges().subscribe(data => {
        this.todoList = data.map(e => {
          return {
            itemID: e.payload.doc.id, 
            itemName: e.payload.doc.data()['Nombre'] || '',
            itemCategory: e.payload.doc.data()['Categoria'] || '',
            itemDescription: e.payload.doc.data()['Descripcion'] || '',
            itemInitialDate: e.payload.doc.data()['Fechadeinicio'] ? new Date(e.payload.doc.data()['Fechadeinicio']) : new Date(),
            itemComments: e.payload.doc.data()['Comentarios'],
            itemDueDate: e.payload.doc.data()['Fechafinal'] ? new Date(e.payload.doc.data()['Fechafinal']) : new Date(),
            itemLocation: e.payload.doc.data()['Ubicacion'] || '',
            isNewlyShared: e.payload.doc.data()['Compartido'] || false
          };
        });
      
      
        if (this.todoList.length > 0) {
          console.log(this.todoList);
        } else {
          console.log("No se encontraron libros asociados al usuario actual.");
        }
      }, error => {
        console.error("Error al obtener los libros:", error);
      });
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  }

  delete(key){
    this.firebase.deleteBook(key).then(() => {
      console.log("Libro eliminado exitosamente");
    }).catch(error => {
      console.error("Error al eliminar el libro:", error);
    });
  }

  async update(item){
    const modal = await this.modalCtrl.create({
      component: UpdatebookPage,
      componentProps: { book: item }
    });
  
    modal.onDidDismiss().then((data) => {
      this.getAllBook
    });
  
    return await modal.present();
  }


  async shareBook(itemId: string) {
    try {
      await this.firestore.collection('Libros').doc(itemId).update({ Compartido: true });
      alert("Campo 'Compartido' actualizado correctamente en Firebase.");
    } catch (error) {
      console.error("Error al actualizar el campo 'Compartido' en Firebase:", error);
    }
  }

  ngOnInit() {
    this.getAllBook();
  }

  getColorForCategory(category: string): string {
    switch (category) {
      case 'Narrative':
        return 'green'; 
      case 'Fantasy':
        return 'blue'; 
      case 'Self-help':
        return 'orange'; 
        case 'Science':
          return 'red'; 
      default:
        return 'black'; 
    }
  }
  getIconForCategory(category: string): string {
    switch (category) {
      case 'Narrative':
        return 'book'; 
      case 'Fantasy':
        return 'color-wand'; 
      case 'Self-help':
        return 'hand-left';
     case 'Science':
          return 'book';  
      default:
        return 'help-circle'; 
    }
  }

}
