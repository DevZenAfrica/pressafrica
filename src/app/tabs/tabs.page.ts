import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../services/utilisateur.service';
import {PaysService} from '../services/pays.service';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private storageService: StorageService, private userService: UtilisateurService, private paysService: PaysService, private translate: TranslateService) {}

  ngOnInit(): void { /*
    if(localStorage.getItem('id')) {
      this.userService.getCurrentUtilisateur().then(
        (doc1) => {
          if(doc1 && doc1.idCountry !== '') {
            this.storageService.setItem('paysSelect', doc1.idCountry);
            this.paysService.getPaysWitchId(doc1.idCountry).then(
              (doc2) => {
                this.translate.use(doc2.language.toLowerCase());
              }
            );
          }
        }
      );
    }*/
  }

}
