import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Pays} from '../models/pays';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor() { }

  async getPays() {
    return new Promise<Pays[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('pays').onSnapshot(
        (docRef) => {
          const result: Pays[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Pays);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getPaysWitchId(idPays: string) {
    return new Promise<Pays>((resolve, reject) => {
      firebase.firestore().collection('pays').doc(idPays).onSnapshot(
        (docRef) => {
          resolve(docRef.data() as Pays);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
