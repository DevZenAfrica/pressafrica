import {ToolsService} from '../services/tools.service';

export class CategorieEditor {

  date: string;
  id: string;

  constructor(public name: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
