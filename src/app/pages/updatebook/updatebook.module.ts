import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatebookPageRoutingModule } from './updatebook-routing.module';

import { UpdatebookPage } from './updatebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatebookPageRoutingModule
  ],
  declarations: [UpdatebookPage]
})
export class UpdatebookPageModule {}
