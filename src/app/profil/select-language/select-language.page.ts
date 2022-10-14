import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UtilisateurService} from '../../services/utilisateur.service';
import {AuthentificationService} from '../../services/authentification.service';
import {AlertService} from '../../services/alert.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.page.html',
  styleUrls: ['./select-language.page.scss'],
})
export class SelectLanguagePage implements OnInit {

  isLoading = false;
  currentLanguage = '';
  currentLanguageSelect = '';

  constructor(private storageService: StorageService, private alertService: AlertService, private authService: AuthentificationService, private translateService: TranslateService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.currentLanguage = this.storageService.getItem('language') ? this.storageService.getItem('language').toLowerCase() : '';
    this.currentLanguageSelect = this.currentLanguage;
  }

  saveLanguage() {
    this.isLoading = true;
    const tmpLangSelect = this.currentLanguageSelect.toLowerCase() ? this.currentLanguageSelect.toLowerCase() : (['en', 'fr'].includes(this.translateService.getBrowserLang()) ? this.translateService.getBrowserLang() : this.translateService.getDefaultLang());
    this.translateService.use(tmpLangSelect);
    this.storageService.setItem('language', this.currentLanguageSelect.toLowerCase());
    this.authService.isAuthenticated().then(
      (data) => {
        if(data) {
          this.userService.getCurrentUtilisateur().then(
            (data1) => {
              const tmpUser = data1;
              tmpUser.language = tmpLangSelect;
              this.userService.updateCurrentUser(tmpUser).then(
                () => {
                  this.isLoading = false;
                  this.alertService.print('Save');
                }
              );
            }
          );
        } else {
          this.isLoading = false;
          this.alertService.print('Save');
        }
      }
    );
  }

}
