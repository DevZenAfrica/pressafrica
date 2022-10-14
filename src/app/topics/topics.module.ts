import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicsPageRoutingModule } from './topics-routing.module';

import { TopicsPage } from './topics.page';
import {HomePageModule} from "../home/home.module";
import {
  PrintMostHeadlineViewedComponent
} from "../shared/print-most-headline-viewed/print-most-headline-viewed.component";
import {
  PrintMostHeadlineCommentedComponent
} from "../shared/print-most-headline-commented/print-most-headline-commented.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TopicsPageRoutingModule,
        HomePageModule,
        TranslateModule
    ],
  declarations: [TopicsPage, PrintMostHeadlineViewedComponent, PrintMostHeadlineCommentedComponent]
})
export class TopicsPageModule {}
