import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectLanguagePageRoutingModule } from './select-language-routing.module';

import { SelectLanguagePage } from './select-language.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectLanguagePageRoutingModule,
        TranslateModule
    ],
  declarations: [SelectLanguagePage]
})
export class SelectLanguagePageModule {}
