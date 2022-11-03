import { Component, OnInit } from '@angular/core';
import {CategorieEditor} from '../../models/categorieEditor';
import {TranslateService} from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';
import {CategorieEditorService} from '../../services/categorie-editor.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss'],
})
export class ChooseCategoryComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 800 ,
    slidesPerView: 0,
    spaceBetween: 10,
    slidesOffsetBefore:10,
    slidesOffsetAfter:10
  };
  categorieSelect = '';
  categoriesEditors: CategorieEditor[] = [];
  inputListCategorie = [];

  public currentLang;

  constructor(private storageService: StorageService, private translate: TranslateService, private alertController: AlertController, private categorieEditorService: CategorieEditorService) { }

  ngOnInit() {
    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
    });

    this.categorieEditorService.getCategorie().then(
      (data) => {
        this.categoriesEditors = data;

        let txt1;
        this.translate.get('1.1-8').subscribe((res: string) => { txt1 = res; });
        this.inputListCategorie.push(
          {
            label: txt1,
            type: 'radio',
            value: '',
            checked: !this.categorieSelect
          }
        );

        for(let i=0; i<this.categoriesEditors.length; i++) {
          this.inputListCategorie.push(
            {
              label: this.getValueTraduct(this.categoriesEditors[i].name),
              type: 'radio',
              value: this.categoriesEditors[i].id,
              checked: this.categorieSelect === this.categoriesEditors[i].id
            }
          );
        }
      }
    );
  }

  async presentAllCategorie() {
    let txt1;
    this.translate.get('1.1-7').subscribe((res: string) => {
      txt1 = res;
    });

    const alert = await this.alertController.create({
      header: txt1,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (categorieChoice) => {
            this.setCategorieSelectGlobal(categorieChoice);
          }
        }
      ],
      inputs: this.inputListCategorie,
      animated: true
    });

    await alert.present();
  }

  setCategorieSelectGlobal(value) {
    this.storageService.setItem('categorieSelect', value);
    window.location.reload();
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split((this.translate.currentLang ? this.translate.currentLang : 'en') + '>');
    if(result1.length > 1) { result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

}
