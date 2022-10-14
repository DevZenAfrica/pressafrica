import {ToolsService} from '../services/tools.service';

export class Editor {

  date: string;
  id: string;
  idCountry: string[];
  language: string[];
  photo = '';
  status: boolean;

  constructor(public name: string, public description: string, public idCategory: string, public idType: string, public idCoverage: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.idCountry = [];
    this.language = [];
    this.status = true;
  }
}
