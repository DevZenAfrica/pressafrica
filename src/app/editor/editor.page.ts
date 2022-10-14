import { Component, OnInit } from '@angular/core';
import {EditorService} from "../services/editor.service";
import {Editor} from "../models/editor";
import {StorageService} from "../services/storage.service";
import {Headline} from "../models/headline";
import {HeadlineService} from "../services/headline.service";
import {EditorType} from "../models/editorType";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  editeurs: Editor[] = [];
  typeEditeurs: EditorType[] = [];
  currentIdCountry = '';
  idCategorySelect = '';
  headlines: Headline[] = [];

  constructor(private translate: TranslateService, private editorService: EditorService, private storageService: StorageService, private headlineService: HeadlineService) {
    this.idCategorySelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.idCategorySelect = this.storageService.getItem('categorieSelect');
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.headlines = [];
    this.editeurs = [];
    this.editorService.getEditors().then(
      (data) => {
        for(let a=0; a<data.length; a++) {
          if((!this.currentIdCountry || data[a].idCountry.includes(this.currentIdCountry)) && (this.idCategorySelect === '' || data[a].idCategory === this.idCategorySelect)) {
            this.editeurs.push(data[a]);
          }
        }
      }
    );
    this.editorService.getTypeEditors().then(
      (data) => {
        this.typeEditeurs = data;
      }
    );
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) {  console.log(); result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }
}
