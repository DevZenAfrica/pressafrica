import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';
import {HomePageModule} from "../home/home.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditorPageRoutingModule,
        HomePageModule,
        TranslateModule
    ],
  declarations: [EditorPage]
})
export class EditorPageModule {}
