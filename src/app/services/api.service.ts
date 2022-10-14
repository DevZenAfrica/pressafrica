import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  async addFileForAdresseId(name: string, adresse: string, file: any ) {
    return new Promise((resolve, reject) => {
      if(file === '') {
        resolve('');
      } else {
        const fileStorageRef = firebase.storage().ref(adresse + '/' + name + '.jpeg');
        return fileStorageRef.put(file).then(
          async () => {
            const downloadUrl = await fileStorageRef.getDownloadURL();
            resolve(downloadUrl);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  async downloadImage(imageUrl: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(imageUrl, { responseType: 'blob' }).subscribe(
        (value) => {
          resolve(value);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
