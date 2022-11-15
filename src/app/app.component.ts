import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';
import {environment} from '../environments/environment';
import {LogCaptureService} from './services/log-capture.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private logCaptureService: LogCaptureService
  ) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language') : ['en', 'fr'].includes(translate.getBrowserLang()) ? translate.getBrowserLang() : 'en' );
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      // Initialize Firebase
      firebase.initializeApp(environment.firebaseConfig);

      // Activation de la persistance de donnée
      //firebase.firestore().enablePersistence();
    });
  }

  eventHandler(event) {
    this.logCaptureService.getLogEvent(event);
  }
}
