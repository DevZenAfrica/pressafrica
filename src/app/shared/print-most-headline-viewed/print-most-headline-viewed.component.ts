import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Headline} from "../../models/headline";
import {StorageService} from "../../services/storage.service";
import {HeadlineService} from "../../services/headline.service";
import {EditorService} from "../../services/editor.service";

@Component({
  selector: 'app-print-most-headline-viewed',
  templateUrl: './print-most-headline-viewed.component.html',
  styleUrls: ['./print-most-headline-viewed.component.scss'],
})
export class PrintMostHeadlineViewedComponent implements OnInit, OnChanges {

  @Input() idCategory;

  headlines: Headline[] = [];
  listAllHeadline: Headline[] = [];

  constructor(private storageService: StorageService, private headlineService: HeadlineService, private editorService: EditorService) { }

  ngOnInit() {
    this.headlineService.getHeadlinesMostView().then(
      (data) => {
        const pointe = this;
        this.listAllHeadline = data;
        this.listAllHeadline.forEach(function(doc) {
          pointe.filtreHeadline(doc.idEditor).then(
            (result) => {
              if(result) {
                pointe.headlines.push(doc);
              }
            }
          );
        });
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const pointe = this;
    this.headlines = [];
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    this.listAllHeadline.forEach(function(doc) {
      if(pointe.idCategory !== '') {
        pointe.filtreHeadline(doc.idEditor).then(
          (result) => {
            if(result) {
              pointe.headlines.push(doc);
            }
          }
        );
      } else {
        pointe.headlines.push(doc);
      }
    });
  }

  filtreObjetVide(tableau: Headline[]) {
    const resultFinal = [];
    for(let a=0; a<tableau.length; a++) {
      if(tableau[a].vues.length > 0) {
        resultFinal.push(tableau[a]);
      }
    }
    return resultFinal;
  }

  trieTableau(tableau: Headline[]) {
    return tableau.sort((a, b) => a.vues.length - b.vues.length).reverse();
  }

  async filtreHeadline(idEditor: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.editorService.getEditorWitchId(idEditor).then(
        (data) => {
          if ((this.idCategory === '' || data.idCategory === this.idCategory) && (!this.storageService.getItem('paysSelect') || data.idCountry.includes(this.storageService.getItem('paysSelect')))) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

}
