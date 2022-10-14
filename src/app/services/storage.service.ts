import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageSub= new Subject();

  constructor() { }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next(data);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }
}
