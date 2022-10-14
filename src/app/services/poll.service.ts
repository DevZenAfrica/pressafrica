import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Poll} from '../models/poll';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  async updatePoll(poll: Poll) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('polls').doc(poll.id).set(Object.assign({}, poll)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async addNewpoll(poll: Poll) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('polls').doc(poll.id).set(Object.assign({}, poll)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getTopPolls() {
    return new Promise<Poll[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('polls').where('status','==', 1).where('top', '==', 1).onSnapshot(
        (docRef) => {
          const result: Poll[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Poll);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getPolls() {
    return new Promise<Poll[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('polls').where('status','==', 1).onSnapshot(
        (docRef) => {
          const result: Poll[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Poll);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getPollWitchId(idPoll: string) {
    return new Promise<Poll>((resolve, reject) => {
      firebase.firestore().collection('polls').doc(idPoll).onSnapshot(
        (docRef) => {
          resolve(docRef.data() as Poll);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
