import {ToolsService} from '../services/tools.service';

export class LogAction {

  date: string;
  id: string;

  constructor(public idUser: string, public action: string, public information: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
