import {ToolsService} from '../services/tools.service';

export class Pays {

  date: string;
  id: string;
  language: string;
  flag: string;

  constructor(public name: string, public code: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.language = '';
    this.flag = '';
  }
}
