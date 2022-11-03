import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../models/utilisateur';
import {UtilisateurService} from '../services/utilisateur.service';
import {AlertService} from '../services/alert.service';
import {AlertController} from '@ionic/angular';
import {AuthentificationService} from '../services/authentification.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

declare function getMsisdn(): any;
declare function getCountry(): any;
declare const globalUserName: any;
declare const avatarUser: any;

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  isLoading = true;
  user: Utilisateur | any = null;
  environment = environment;

  constructor(private translate: TranslateService, private alertService: AlertService, private userService: UtilisateurService, private alertController: AlertController, private authService: AuthentificationService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (result) => {
        if(result) {
          this.userService.getCurrentUtilisateur().then(
            (data) => {
              this.user = data;
              if(this.user.typeInscription === 'ayoba') { this.user.photo = avatarUser; }
              this.isLoading = false;
            }
          );
        } else { this.isLoading = false; }
      }
    );
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.googleAuth().then(
      () => {
        location.reload();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error);
      }
    );
  }

  async confirmDeconnexion() {
    let txt1; let txt2; let txt3;
    this.translate.get('10.12').subscribe((res: string) => { txt1 = res; });
    this.translate.get('10.13').subscribe((res: string) => { txt2 = res; });
    this.translate.get('10.14').subscribe((res: string) => { txt3 = res; });

    const alert = await this.alertController.create({
      header: txt1,
      message: txt2,
      buttons: [
        {
          text: txt3,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OK',
          handler: () => {
            this.authService.signOut().then();
            localStorage.clear();
            location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

}
