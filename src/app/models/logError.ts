import {ToolsService} from '../services/tools.service';

export class LogError {

  date: string;
  id: string;

  constructor(public idUser: string, public level: number, public error: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
