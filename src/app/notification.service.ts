import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  message$: Observable<string> = this.messageSubject.asObservable();

 
  showMessage(message: string) {
    this.messageSubject.next(message);
  }
}
