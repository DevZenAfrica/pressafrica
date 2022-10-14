import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewHeadlineLikedPage } from './preview-headline-liked.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewHeadlineLikedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewHeadlineLikedPageRoutingModule {}
