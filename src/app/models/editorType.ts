import {ToolsService} from '../services/tools.service';

export class EditorType {

  date: string;
  id: string;
  priorite: number;

  constructor(public name: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.priorite = 0;
  }
}
