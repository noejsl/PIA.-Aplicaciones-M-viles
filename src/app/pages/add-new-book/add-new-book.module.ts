import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AddNewBookPageRoutingModule } from './add-new-book-routing.module';

import { AddNewBookPage } from './add-new-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewBookPageRoutingModule
  ],
  declarations: [AddNewBookPage]
})
export class AddNewBookPageModule {
 




}
