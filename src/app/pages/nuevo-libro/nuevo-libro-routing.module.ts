import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoLibroPage } from './nuevo-libro.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoLibroPageRoutingModule {}
