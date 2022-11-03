import {Component, OnInit} from '@angular/core';
import {Headline} from '../models/headline';
import {Utilisateur} from '../models/utilisateur';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

 paySelect = '';
  headlines: Headline[] = [];

  categorieSelect = '';

  currentUser: Utilisateur = null;
  currentSearch = '';

  ayobaData = '';
  ayobaDataStorage = '';
  ayobaDataGet = '';

  globalUserName: any;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
    });

    if(!localStorage.getItem('isReloadApp') || this.getDateGoodFormat(new Date().toString()) !== this.getDateGoodFormat(localStorage.getItem('isReloadApp')))
    {
      localStorage.setItem('isReloadApp', (new Date().toString()));
      setTimeout(() => { window.location.reload(); }, 3000);
    }

  }

  getDateGoodFormat(date: string) {
    const dateFormat = new Date(date);
    return dateFormat.getDate() + '-' + dateFormat.getMonth() + '-' + dateFormat.getFullYear();
  }
}
