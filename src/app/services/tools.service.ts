import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  generateId(len: number) {
    const arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('');
  }
}
