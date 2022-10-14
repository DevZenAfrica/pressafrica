import {ToolsService} from '../services/tools.service';

export class Headline {

  date: string;
  id: string;
  likes: string[];
  disLikes: string[];
  tags: string[];
  vues: string[];
  image = '';
  status: number;

  constructor(public idEditor: string, public title: string, public content: string, public dateParution: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.likes = [];
    this.disLikes = [];
    this.tags = [];
    this.vues = [];
    this.image = '';
  }
}
