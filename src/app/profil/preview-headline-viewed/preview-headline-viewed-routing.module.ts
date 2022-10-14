import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewHeadlineViewedPage } from './preview-headline-viewed.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewHeadlineViewedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewHeadlineViewedPageRoutingModule {}
