import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatebookPage } from './updatebook.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatebookPageRoutingModule {}
