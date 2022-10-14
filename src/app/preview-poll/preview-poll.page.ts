import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Poll} from '../models/poll';
import {PollService} from '../services/poll.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-preview-poll',
  templateUrl: './preview-poll.page.html',
  styleUrls: ['./preview-poll.page.scss'],
})
export class PreviewPollPage implements OnInit {

  currentPoll: Poll = null;

  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.pollService.getPollWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data) => {
        this.currentPoll = data;
      }
    );
  }

  isPair(nombre: number): boolean {
    return nombre % 2 === 0;
  }

  getValeurEntiere(nombre: number) {
    return Math.trunc(nombre);
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split((this.translate.currentLang ? this.translate.currentLang : 'en') + '>');
    if(result1.length > 1) { result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  getNombreWitchChoice(choice: number) {
    switch (choice) {
      case 1:
        return this.currentPoll.choice1;
        break;
      case 2:
        return this.currentPoll.choice2;
        break;
      case 3:
        return this.currentPoll.choice3;
        break;
      case 4:
        return this.currentPoll.choice4;
        break;
      case 5:
        return this.currentPoll.choice5;
        break;
    }
  }

}
