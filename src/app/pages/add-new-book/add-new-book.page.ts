import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from 'src/app/todo.service';
import { FirebaseService } from 'src/app/firebase.service';
import { AutheticationService } from 'src/app/authetication.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.page.html',
  styleUrls: ['./add-new-book.page.scss'],
})
export class AddNewBookPage implements OnInit {

  BookName: string;
  BookDescription: string;
  BookCategory: string;
  BookLocation: string;
  BookInitialdate: Date;
  BookDuedate: Date;
  isNewlyShared: false;
  BookComments: string[] = [];

  // Define defaultTime aquí
  defaultTime = '12:00';

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService,
    public firebase: FirebaseService,
    private authService: AutheticationService // Inyecta el servicio de autenticación
  ) { }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }


  async add() {
    
    const newBook = {
      itemName: this.BookName,
      itemCategory: this.BookCategory,
      itemDescription: this.BookDescription,
      itemLocation: this.BookLocation,
      itemDueDate: this.BookDuedate,
      itemInitialDate: this.BookInitialdate,
      isNewlyShared: false,
      comments: [],
    };

    await this.firebase.agregarLibro(newBook); // Agrega el libro a Firebase
    await this.dismiss(); // Cierra el modal después de agregar el libro
  }
}
