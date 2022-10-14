import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {AuthentificationService} from "../../services/authentification.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.page.html',
  styleUrls: ['./update-profil.page.scss'],
})
export class UpdateProfilPage implements OnInit {

  isLoading = true;
  currentUser: Utilisateur;

  constructor(private navCtrl: NavController, private authService: AuthentificationService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(
      (donnee) => {
        if(donnee) {
          this.userService.getCurrentUtilisateur().then(
            (data) => {
              this.currentUser = data;
              this.isLoading = false;
            }
          );
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.userService.updateCurrentUser(this.currentUser).then(
      () => {
        this.isLoading = false;
        //this.navCtrl.back();
        location.reload();
      }
    );
  }

}
