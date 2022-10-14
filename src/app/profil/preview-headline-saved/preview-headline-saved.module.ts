import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewHeadlineSavedPageRoutingModule } from './preview-headline-saved-routing.module';

import { PreviewHeadlineSavedPage } from './preview-headline-saved.page';
import {HomePageModule} from "../../home/home.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreviewHeadlineSavedPageRoutingModule,
        HomePageModule,
        TranslateModule
    ],
  declarations: [PreviewHeadlineSavedPage]
})
export class PreviewHeadlineSavedPageModule {}
