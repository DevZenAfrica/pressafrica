import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewHeadlineSavedPage } from './preview-headline-saved.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewHeadlineSavedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewHeadlineSavedPageRoutingModule {}
