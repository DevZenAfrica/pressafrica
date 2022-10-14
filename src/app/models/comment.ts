import {ToolsService} from '../services/tools.service';

export class Comment {

  date: string;
  id: string;
  likes: string[];
  disLikes: string[];

  constructor(public idHeadline: string, public idUser: string, public idParent: string, public text: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.likes = [];
    this.disLikes = [];
  }
}
