import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {CategorieEditor} from '../models/categorieEditor';

@Injectable({
  providedIn: 'root'
})
export class CategorieEditorService {

  constructor() { }

  async addCategorie(categorie: CategorieEditor) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('categoriesEditors').doc(categorie.id).set(Object.assign({}, categorie)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getCategorie() {
    return new Promise<CategorieEditor[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('categoriesEditors').onSnapshot(
        (docRef) => {
          const result: CategorieEditor[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as CategorieEditor);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
