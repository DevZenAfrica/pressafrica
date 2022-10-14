import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Headline} from "../../models/headline";
import {AuthentificationService} from "../../services/authentification.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {HeadlineService} from "../../services/headline.service";

@Component({
  selector: 'app-preview-headline-viewed',
  templateUrl: './preview-headline-viewed.page.html',
  styleUrls: ['./preview-headline-viewed.page.scss'],
})
export class PreviewHeadlineViewedPage implements OnInit {

  isLoading = false;
  currentUser: Utilisateur = null;
  headlines: Headline[] = [];

  constructor(private authService: AuthentificationService, private userService: UtilisateurService, private headlineService: HeadlineService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(
      (data) => {
        if(data) {
          this.userService.getCurrentUtilisateur().then(
            (data1) => {
              this.currentUser = data1;
              this.headlineService.getHeadlineViewed(this.currentUser.id).then(
                (data2) => {
                  this.headlines = data2;
                }
              );
            }
          );
        }
      }
    );
  }

}
