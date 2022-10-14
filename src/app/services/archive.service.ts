import { Injectable } from '@angular/core';
import {Headline} from '../models/headline';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor() { }

  /*
  async getArchives() {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Headline);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }*/
}
