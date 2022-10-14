import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';
import {UtilisateurService} from '../../services/utilisateur.service';
import {HeadlineService} from '../../services/headline.service';
import {Headline} from '../../models/headline';
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'app-preview-headline-saved',
  templateUrl: './preview-headline-saved.page.html',
  styleUrls: ['./preview-headline-saved.page.scss'],
})
export class PreviewHeadlineSavedPage implements OnInit {

  isLoading = false;
  currentUser: Utilisateur = null;
  headlines: Headline[] = [];

  constructor(private headlineService: HeadlineService, private userService: UtilisateurService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(
      (data) => {
        if(data) {
          this.userService.getCurrentUtilisateur().then(
            (data1) => {
              this.currentUser = data1;

              for(let i=0; i<this.currentUser.archives.length; i++) {
                this.headlineService.getHeadlineWitchId(this.currentUser.archives[i]).then(
                  (data2) => {
                    this.headlines.push(data2);
                  }
                )
              }
            }
          );
        }
      }
    );
  }
}
