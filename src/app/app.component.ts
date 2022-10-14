import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language') : ['en', 'fr'].includes(translate.getBrowserLang()) ? translate.getBrowserLang() : 'en' );
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      const firebaseConfig = {
        apiKey: 'AIzaSyDdOCNlvPKUDz7HrccaVtiHUq-w2w2R0po',
        authDomain: 'ayoba-news-headlines.firebaseapp.com',
        projectId: 'ayoba-news-headlines',
        storageBucket: 'ayoba-news-headlines.appspot.com',
        messagingSenderId: '204095383734',
        appId: '1:204095383734:web:6aa34fe61a061bbe3d1e17'
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Activation de la persistance de donnée
      firebase.firestore().enablePersistence();
    });
  }
}
