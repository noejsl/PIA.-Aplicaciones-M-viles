import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { AutheticationService } from '../authetication.service';
import { NotificationService } from 'src/app/notification.service';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Libro } from '../pages/nuevo-libro/models/model.libro';
import { Comment } from '../pages/add-new-book/models/libro.model';
import { RouterModule } from '@angular/router';
import { ComentariosPage } from '../comentarios/comentarios.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  todoList: Libro [] = [];
  user: any;
  bookChangeSubscription: Subscription;
  messageSubscription: Subscription

  constructor(public route: Router, public authService: AutheticationService, 
    public firebase: FirebaseService,
    public modalCtrl: ModalController,
    public todoService: TodoService,  private notificationService: NotificationService,
    public firestore: AngularFirestore,
    private menu: MenuController
  ){
    this.user = authService.getProfile()
    
  }

  closeMenu() {
    this.menu.close('menu'); // 'menu' es el identificador del menú definido en el atributo menuId del elemento <ion-menu>
  }

  ngOnInit() {
   this.getAllBook()
  }


  async getAllBook() {
    
    try {
      const userId = await this.firebase.obtenerIdUsuarioActual();
      if (!userId) {
        console.error("No hay usuario autenticado.");
        return;
      }
      this.firestore.collection('Libros', ref => ref.where('Compartido', '==', true)).snapshotChanges().subscribe(data => {
        this.todoList = []; // Limpiar la lista antes de actualizarla
        data.forEach(e => {
          const libro = {
            itemOwner: e.payload.doc.data()['Propietario'],
            itemID: e.payload.doc.id,
            itemName: e.payload.doc.data()['Nombre'] || '',
            itemCategory: e.payload.doc.data()['Categoria'] || '',
            itemDescription: e.payload.doc.data()['Descripcion'] || '',
            itemInitialDate: e.payload.doc.data()['Fechadeinicio'] ? new Date(e.payload.doc.data()['Fechadeinicio']) : new Date(),
            itemComments: e.payload.doc.data()['Comentarios'],
            itemDueDate: e.payload.doc.data()['Fechafinal'] ? new Date(e.payload.doc.data()['Fechafinal']) : new Date(),
            itemLocation: e.payload.doc.data()['Ubicacion'] || '',
            isNewlyShared: e.payload.doc.data()['Compartido'] || false,
            itemOwnerName: '' // Nombre del propietario, se actualizará más adelante
          };
          this.firestore.collection('Usuarios').doc(e.payload.doc.data()['Propetario']).get().subscribe(userSnapshot => {
            libro.itemOwnerName = userSnapshot.data()['itemName'];
          });
      

          console.log(libro.itemOwnerName)
          this.todoList.push(libro);
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

 


  public async logout() {
    this.authService.signOut().then(() => {
      this.route.navigate(['/landing']);
    }).catch((Error) => {
      console.log(Error);
    });
  }


  async verComentarios(itemID) {
    const userId = await this.firebase.obtenerIdUsuarioActual();
    console.log (itemID)
    const modal = await this.modalCtrl.create({
      component: ComentariosPage,
      componentProps: {  ID: itemID
        }
    });

    return await modal.present();
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








