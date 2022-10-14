import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HeadlineService} from "../services/headline.service";
import {Headline} from "../models/headline";
import {StorageService} from "../services/storage.service";
import {EditorService} from "../services/editor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  currentSearch: string;
  listAllHeadline: Headline[] = [];
  headlines: Headline[] = [];
  categorieSelect: string;

  constructor(private activatedRoute: ActivatedRoute, private editorService: EditorService, private storageService: StorageService, private navCtrl: NavController, private headlineService: HeadlineService) { }

  ngOnInit() {
    this.currentSearch = this.activatedRoute.snapshot.paramMap.get('texte');
    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
      this.reloadSearch();
    });
    this.reloadSearch();
  }

  reloadSearch() {
    if(this.currentSearch) {
      this.headlineService.getHeadlines().then(
        (data) => {
          this.listAllHeadline = data;

          const pointe = this;
          this.headlines = [];
          let tmpHeadline: Headline[] = [];
          // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          this.listAllHeadline.forEach(function(doc) {
            if(pointe.filtreSearchFromTexte(pointe.currentSearch, doc)) {
              if(pointe.categorieSelect !== '') {
                pointe.filtreHeadline(doc.idEditor).then(
                  (result) => {
                    if(result) {
                      //pointe.headlines.push(doc);

                      tmpHeadline.push(doc);
                      tmpHeadline = pointe.trieTableau(tmpHeadline);
                    }
                  }
                );
              } else {
                //pointe.headlines.push(doc);

                tmpHeadline.push(doc);
                tmpHeadline = pointe.trieTableau(tmpHeadline);
              }
            }
          });

          this.headlines = tmpHeadline;
        }
      );
    }
  }

  trieTableau(tableau: Headline[]) {
    const tmpValue = tableau.sort((a, b) => this.convertStringDateToNumber(a.dateParution) - this.convertStringDateToNumber(b.dateParution));
    return tmpValue.reverse();
  }

  filtreSearchFromTexte(currentSearch: string, doc: Headline) {
    return doc.title.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1 || doc.content.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1 || doc.tags.toString().toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1 || doc.idEditor.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1;
  }

  convertStringDateToNumber(date: string) {
    return Number(date.replace(/-/g, ''));
  }

  async filtreHeadline(idEditor: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.editorService.getEditorWitchId(idEditor).then(
        (data) => {
          if (data.idCategory === this.categorieSelect) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  backToPreview() {
    this.navCtrl.back();
  }

}
