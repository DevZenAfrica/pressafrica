import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Utilisateur} from '../models/utilisateur';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor() { }

  async getUtilisateurWitchPhoneNumber(numero: string) {
    return new Promise<Utilisateur>((resolve, reject) => {
      firebase.firestore().collection('comptes').where('phone', '==', numero).onSnapshot(
        (docRef) => {
          const result: Comment[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Comment);
          });
          resolve(result.length > 0 ? result[0] as any : null);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getUtilisateurWitchId(id: string) {
    return new Promise<Utilisateur>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Utilisateur);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  updateCurrentUser(userUpdate: Utilisateur) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(localStorage.getItem('id')).set(Object.assign({}, userUpdate)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getCurrentUtilisateur() {
    return new Promise<Utilisateur>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(localStorage.getItem('id')).get().then(
        (docRef) => {
          resolve(docRef.data() as Utilisateur);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
