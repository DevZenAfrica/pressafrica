import { Component, OnInit } from '@angular/core';
import {PollService} from '../../services/poll.service';
import {Poll} from '../../models/poll';

@Component({
  selector: 'app-print-top-pools',
  templateUrl: './print-top-pools.component.html',
  styleUrls: ['./print-top-pools.component.scss'],
})
export class PrintTopPoolsComponent implements OnInit {

  polls: Poll[] = [];

  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.pollService.getTopPolls().then(
      (data) => {
        for(let i=0; i<data.length; i++) {
          if(localStorage.getItem('paysSelect')) {
            if(data[i].idCountry.includes(localStorage.getItem('paysSelect'))) {
              this.polls.push(data[i]);
            }
          } else {
            this.polls.push(data[i]);
          }
        }
      }
    );
  }

}
