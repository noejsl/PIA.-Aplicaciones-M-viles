import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewBookPage } from './add-new-book.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewBookPageRoutingModule {}
