import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoLibroPageRoutingModule } from './nuevo-libro-routing.module';

import { NuevoLibroPage } from './nuevo-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoLibroPageRoutingModule
  ],
  declarations: [NuevoLibroPage]
})
export class NuevoLibroPageModule {}
