import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  async getDataWitchApi(link, type: any = 'text') {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return new Promise<void>((resolve, reject) => {
      this.httpClient.get(environment.apiCors + '/' + link, {headers, responseType: type}).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

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
