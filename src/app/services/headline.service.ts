import { Injectable } from '@angular/core';
import {Headline} from '../models/headline';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor() { }

  async getHeadlinesMostView() {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').orderBy('vues', 'asc').onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            if((doc.data() as Headline).status !== 0 && (doc.data() as Headline).status !== 0) {
              result.push(doc.data() as Headline);
            }
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async updateVueHeadlineWitchId(idHeadline: string, idUser: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(idHeadline).update(
        {
          vues: firebase.firestore.FieldValue.arrayUnion(idUser)
        }
      ).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlineLiked(idUser: string) {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').where('likes', 'array-contains', idUser).onSnapshot(
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
  }

  async getHeadlineViewed(idUser: string) {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').where('vues', 'array-contains', idUser).onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            if((doc.data() as Headline).status !== 0) {
              result.push(doc.data() as Headline);
            }
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlineWitchId(idHeadline: string) {
    return new Promise<Headline>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(idHeadline).get().then(
        (docRef) => {
          resolve(docRef.data() as Headline);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlinesWitchText(value: string) {
    return new Promise<Headline[]>((resolve, reject) => {
      const result: Headline[] = [];
      // Recherche dans les titres
      firebase.firestore().collection('headlines').where('title', '>=', value).where('title', '<=', value + 'uf8ff').onSnapshot(
        (docRef) => {
          for(let i=0; i<docRef.docs.length; i++) {
            if(!result.includes(docRef.docs[i].data() as Headline) && (docRef.docs[i].data() as Headline).status !== 0) {
              result.push(docRef.docs[i].data() as Headline);
            }
          }
        }, (error) => {
          reject(error);
        }
      );

      // Recherche dans les tagues
      firebase.firestore().collection('headlines').where('tags', 'array-contains',  value).onSnapshot(
        (docRef) => {
          for(let i=0; i<docRef.docs.length; i++) {
            if(!result.includes(docRef.docs[i].data() as Headline) && (docRef.docs[i].data() as Headline).status !== 0) {
              result.push(docRef.docs[i].data() as Headline);
            }
          }
        }, (error) => {
          reject(error);
        }
      );

      // Recherche dans les descriptions
      firebase.firestore().collection('headlines').where('content', '>=', value).where('content', '<=', value + 'uf8ff').onSnapshot(
        (docRef) => {
          for(let i=0; i<docRef.docs.length; i++) {
            if(!result.includes(docRef.docs[i].data() as Headline) && (docRef.docs[i].data() as Headline).status !== 0) {
              result.push(docRef.docs[i].data() as Headline);
            }
          }
          resolve(result as Headline[]);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlinesWitchDate(value: string) {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').where('dateParution', '==', value).onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            if(doc.data().status !== 0) {
              result.push(doc.data() as Headline);
            }
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlinesWitchIdEditor(idEditor: string, limit = 100) {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').orderBy('dateParution', 'desc').where('idEditor', '==', idEditor).limit(limit).onSnapshot(
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
  }

  async getHeadlines() {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').orderBy('date', 'desc').onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            if(doc.data().status !== 0) {
              result.push(doc.data() as Headline);
            }
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async addNewHeadline(headline: Headline) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(headline.id).set(Object.assign({}, headline)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async likeHeadline(headline: Headline) {
    const tmpH = headline;
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(headline.id).update(
        {
          likes: headline.likes.includes(localStorage.getItem('id')) ? firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id')) : firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('id')),
          disLikes: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id'))
        }
      ).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async disLikeHeadline(headline: Headline) {
    const tmpH = headline;
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(headline.id).update(
        {
          disLikes: headline.disLikes.includes(localStorage.getItem('id')) ? firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id')) : firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('id')),
          likes: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id'))
        }
      ).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
