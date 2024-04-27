import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiperfilPageRoutingModule } from './miperfil-routing.module';

import { MiperfilPage } from './miperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiperfilPageRoutingModule
  ],
  declarations: [MiperfilPage]
})
export class MiperfilPageModule {}
