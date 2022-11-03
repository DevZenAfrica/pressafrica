import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {AuthentificationService} from './authentification.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import firebase from 'firebase';

declare function getMsisdn(): any;

@Injectable({
  providedIn: 'root'
})
export class LogCaptureService {

  constructor(private router: Router, private apiService: ApiService, private authService: AuthentificationService) { }

  getLogEvent(event) {
    if(!localStorage.getItem('ip-adress-info')) {
      this.apiService.getDataWitchApi(environment.apiGetIpAdress + environment.keyGetIpAdress, 'json').then(
        (data) => {
          localStorage.setItem('ip-adress-info', JSON.stringify(data));
          this.saveLogInDataBase({ zoneClick :  event.target.textContent, linkOpen: this.router.url, idUser: localStorage.getItem('id') ? localStorage.getItem('id') : this.authService.getAnonymeId(), ayobaApp: getMsisdn() ? true : false, ipAdressInfo : localStorage.getItem('ip-adress-info'), date: (new Date()).toString()});
        }
      );
    } else {
      this.saveLogInDataBase({ zoneClick :  event.target.textContent, linkOpen: this.router.url, idUser: localStorage.getItem('id') ? localStorage.getItem('id') : this.authService.getAnonymeId(), ayobaApp: getMsisdn() ? true : false, ipAdressInfo : localStorage.getItem('ip-adress-info'), date: (new Date()).toString()});
    }
  }

  saveLogInDataBase(data) {
    firebase.firestore().collection('logs-events').doc().set(Object.assign({}, data));
  }

  getDateGoodFormat(date: string) {
    const dateFormat = new Date(date);
    return dateFormat.getDate() + '-' + dateFormat.getMonth() + '-' + dateFormat.getFullYear();
  }
}
