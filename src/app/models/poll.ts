import {ToolsService} from '../services/tools.service';

export class Poll {

  date: string;
  id: string;
  customResponses: string[];
  choice1: string[];
  choice2: string[];
  choice3: string[];
  choice4: string[];
  choice5: string[];
  top: number;
  photo: string;
  idUser: string;
  status: number;
  idCountry: string[];

  constructor(public title: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.choice1 = [];
    this.choice2 = [];
    this.choice3 = [];
    this.choice4 = [];
    this.choice5 = [];
    this.customResponses = [];
    this.top = 0;
    this.photo = '';
    this.status = 1;
    this.idCountry = [];
  }
}
