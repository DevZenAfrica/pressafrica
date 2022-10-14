import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur.service";
import {Headline} from "../../models/headline";
import {AuthentificationService} from "../../services/authentification.service";
import {Utilisateur} from "../../models/utilisateur";
import {HeadlineService} from "../../services/headline.service";

@Component({
  selector: 'app-preview-headline-liked',
  templateUrl: './preview-headline-liked.page.html',
  styleUrls: ['./preview-headline-liked.page.scss'],
})
export class PreviewHeadlineLikedPage implements OnInit {

  currentUser: Utilisateur = null;
  headlines: Headline[] = [];
  isLoading = false;

  constructor(private headlineService: HeadlineService, private authService: AuthentificationService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(
      (data) => {
        if(data) {
          this.userService.getCurrentUtilisateur().then(
            (data1) => {
              this.currentUser = data1;
              this.headlineService.getHeadlineLiked(this.currentUser.id).then(
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
