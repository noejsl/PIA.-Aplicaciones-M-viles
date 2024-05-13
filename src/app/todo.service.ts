import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private bookChangeSubject: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  bookChange$ = this.bookChangeSubject.asObservable();

  constructor(private storage: Storage, private firebase : FirebaseService, private firestore: AngularFirestore) {
    
   }

  addBook(key, value){
    this.storage.set(key, value).then(() => {
      this.bookChangeSubject.next(); 
    });
  }

  deleteBook(key){
    this.storage.remove(key).then(() => {
      this.bookChangeSubject.next(); 
    });
  }

  updateBook(key, newValue){
    this.storage.set(key, newValue).then(() => {
      this.bookChangeSubject.next(); 
    });
  }


  

}

