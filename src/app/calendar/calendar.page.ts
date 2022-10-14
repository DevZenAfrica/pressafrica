import { Component, OnInit } from '@angular/core';
import {Headline} from "../models/headline";
import {HeadlineService} from "../services/headline.service";
import {StorageService} from "../services/storage.service";
import {EditorService} from "../services/editor.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  etatSelection = false;
  headlines: Headline[] = [];
  currentDate = new Date();
  dateToday = new Date();
  texteSelection = 'Today';

  constructor(private headlineService: HeadlineService, private storageService: StorageService, private editorService: EditorService) { }

  ngOnInit() {
    this.searchFromDate(this.convertDateToFormat(new Date()));
  }

  previewDate() {
    this.etatSelection = false;
    this.currentDate = new Date(+new Date(this.currentDate) - 1000*60*60*24);
    this.updateTexte(this.currentDate);
    this.searchFromDate(this.currentDate);
  }

  getDateNumber(date) {
    return (new Date(date).getMonth()) + (new Date(date).getFullYear()) + (new Date(date).getDate());
  }

  updateTexte(date) {
    this.etatSelection = false;
    if(this.getDateNumber(this.dateToday) -1 === this.getDateNumber(date)) {
      this.texteSelection = 'Yesterday';
    } else if(this.getDateNumber(this.dateToday) === this.getDateNumber(date)) {
      this.texteSelection = 'Today';
    } else {
      this.texteSelection = (new Date(date)).getDate() + ' / ' + (new Date(date)).getMonth() + ' / ' + (new Date(date)).getFullYear();
    }
  }

  followDate() {
    this.etatSelection = false;
    this.currentDate = new Date(+new Date(this.currentDate) + 1000*60*60*24);
    this.etatSelection = false;
    this.updateTexte(this.currentDate);
    this.searchFromDate(this.currentDate);
  }

  searchFromDate(event) {
    this.currentDate = new Date(event);
    this.headlineService.getHeadlinesWitchDate(this.convertDateToFormat(event)).then(
      (data) => {
        let tmpHeadline: Headline[] = [];
        for(let a=0; a<data.length; a++) {
          this.editorService.getEditorWitchId(data[a].idEditor).then(
            (data25) => {
              if(!this.storageService.getItem('paysSelect') || data25.idCountry.includes(this.storageService.getItem('paysSelect'))) {
                tmpHeadline.push(data[a]);
                tmpHeadline = this.trieTableau(tmpHeadline);
              }
            }
          );
        }
        this.headlines = tmpHeadline;
      }
    );
  }

  trieTableau(tableau: Headline[]) {
    const tmpValue = tableau.sort((a, b) => this.convertStringDateToNumber(a.dateParution) - this.convertStringDateToNumber(b.dateParution));
    return tmpValue.reverse();
  }

  convertStringDateToNumber(date: string) {
    return Number(date.replace(/-/g, ''));
  }

  convertDateToFormat(dateValue) {
    return (new Date(dateValue)).getFullYear() + '-' + (((new Date(dateValue)).getMonth() + 1) < 10 ? '0' + ((new Date(dateValue)).getMonth() + 1).toString() : (new Date(dateValue)).getMonth() + 1)  + '-' + (new Date(dateValue)).getDate();
  }

}
