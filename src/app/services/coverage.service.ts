import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Coverage} from '../models/coverage';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {

  constructor() { }

  async getAllCoverage() {
    return new Promise<Coverage[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('coverage').orderBy('priorite', 'asc').onSnapshot(
        (docRef) => {
          const result: Coverage[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Coverage);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getCoverageWitchId(idHeadline: string) {
    return new Promise<Coverage>((resolve, reject) => {
      firebase.firestore().collection('coverage').doc(idHeadline).get().then(
        (docRef) => {
          resolve(docRef.data() as Coverage);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
