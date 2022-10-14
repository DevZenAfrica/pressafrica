import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewPollPage } from './preview-poll.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewPollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewPollPageRoutingModule {}
