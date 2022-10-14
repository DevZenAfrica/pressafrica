import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewHeadlinePageRoutingModule } from './preview-headline-routing.module';

import { PreviewHeadlinePage } from './preview-headline.page';
import {TranslateModule} from '@ngx-translate/core';
import {MiniatureCommentComponent} from "../shared/miniature-comment/miniature-comment.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewHeadlinePageRoutingModule,
    TranslateModule
  ],
  exports: [
    MiniatureCommentComponent
  ],
  declarations: [PreviewHeadlinePage, MiniatureCommentComponent]
})
export class PreviewHeadlinePageModule {}
