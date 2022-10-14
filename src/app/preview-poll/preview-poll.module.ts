import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewPollPageRoutingModule } from './preview-poll-routing.module';

import { PreviewPollPage } from './preview-poll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewPollPageRoutingModule
  ],
  declarations: [PreviewPollPage]
})
export class PreviewPollPageModule {}
