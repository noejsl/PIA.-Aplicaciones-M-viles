import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from 'src/app/todo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.page.html',
  styleUrls: ['./updatebook.page.scss'],
})
export class UpdatebookPage implements OnInit {
  @Input() book: any;

  constructor(
    public modalCtrl: ModalController, 
    public todoService: TodoService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    console.log(this.book);

    this.BookName = this.book.itemName || '';
    this.BookDescription = this.book.itemDescription || '';
    this.BookDuedate = this.book.itemDueDate ? new Date(this.book.itemDueDate) : new Date();
    this.BookInitialdate = this.book.itemInitialDate ? new Date(this.book.itemInitialDate) : new Date();
    this.BookLocation = this.book.itemLocation || '';
    this.BookCategory = this.book.itemCategory || '';
  }

  BookName: string;
  BookDescription: string;
  BookCategory: string;
  BookLocation: string;
  BookInitialdate: Date;
  BookDuedate: Date;
  BookComments: string[] = []; // Array to store comments

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async update() {
    try {
      const bookDocRef = this.firestore.collection('Libros').doc(this.book.itemID);
  
      await bookDocRef.update({
        Nombre: this.BookName,
        Categoria: this.BookCategory,
        Descripcion: this.BookDescription,
        Ubicacion: this.BookLocation,
        Fechafinal: this.BookDuedate,
        Fechadeinicio: this.BookInitialdate,
        Comentarios: this.BookComments
      });
  
      this.dismiss();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

}

