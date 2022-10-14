import { Component, OnInit } from '@angular/core';
import {Headline} from '../models/headline';
import {Editor} from '../models/editor';
import {Comment} from '../models/comment';
import {Utilisateur} from '../models/utilisateur';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../services/alert.service';
import {ModalController, ToastController} from '@ionic/angular';
import {UtilisateurService} from '../services/utilisateur.service';
import {CommentService} from '../services/comment.service';
import {EditorService} from '../services/editor.service';
import {HeadlineService} from '../services/headline.service';
import {AuthentificationService} from '../services/authentification.service';

@Component({
  selector: 'app-preview-headline',
  templateUrl: './preview-headline.page.html',
  styleUrls: ['./preview-headline.page.scss'],
})
export class PreviewHeadlinePage implements OnInit {

  isLoading = false;
  currentHeadline: Headline;
  currentEditor: Editor = null;
  currentComment: Comment[] = [];
  currentUser: Utilisateur = null;
  isComment = false;
  writeComment = '';
  scrollComment = false;

  constructor(private router: Router, private authService: AuthentificationService, private activatedRoute: ActivatedRoute, private translate: TranslateService, private alertService: AlertService, private toastController: ToastController, private userService: UtilisateurService, private commentService: CommentService, private editorService: EditorService, private modalCtrl: ModalController, private headlineService: HeadlineService) { }

  ngOnInit() {
    if(this.activatedRoute.snapshot.paramMap.get('id').split('?').length > 1) { this.scrollComment = true; }
    this.headlineService.getHeadlineWitchId(this.scrollComment ? this.activatedRoute.snapshot.paramMap.get('id').split('?')[0] : this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data) => {
        this.currentHeadline = data;

        this.editorService.getEditorWitchId(this.currentHeadline.idEditor).then(
          (data1) => {
            this.currentEditor = data1;
          }
        );

        this.commentService.getComments(this.currentHeadline.id).then(
          (data2) => {
            this.currentComment = data2;
            if(this.scrollComment) { this.scrollToElement('liste_comment'); }
          }
        );

        this.authService.isAuthenticated().then(
          (result) => {
            if(result) {
              this.userService.getCurrentUtilisateur().then(
                (data3) => {
                  this.currentUser = data3;
                  if(!this.currentHeadline.vues.includes(this.currentUser.id)) {
                    this.headlineService.updateVueHeadlineWitchId(this.currentHeadline.id, this.currentUser.id);
                  }
                }
              );
            } else {
              if(!this.currentHeadline.vues.includes(this.authService.getAnonymeId())) {
                this.headlineService.updateVueHeadlineWitchId(this.currentHeadline.id, this.authService.getAnonymeId());
              }
            }
          }
        );
      }
    );
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) { result2 = result1[1].split('</' + this.translate.currentLang + '>'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  shared() {
    navigator.share({
      title: this.currentHeadline.title,
      text: '',
      url: 'https://ayoba-news-headlines.web.app/headline/' + this.currentHeadline.id
    });
  }

  scrollToElement(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  sendComment(idParent: string) {
    if(this.writeComment) {
      const tmpComment = new Comment(this.currentHeadline.id, this.currentUser.id, idParent, this.writeComment);
      this.commentService.addNewComment(tmpComment).then(
        () => {
          this.currentComment.unshift(tmpComment);
          this.writeComment = '';
          this.isComment = false;
          this.scrollToElement('title_comment');
        }
      );
    }
  }

  like() {
    this.headlineService.likeHeadline(this.currentHeadline).then(
      () => {
        if(this.currentHeadline.likes.includes(this.currentUser.id))
        {this.currentHeadline.likes.splice(this.currentHeadline.likes.indexOf(this.currentUser.id), 1);}
        else
        {
          if(this.currentHeadline.disLikes.includes(this.currentUser.id)) {
            this.dislike();
          }
          this.currentHeadline.likes.push(this.currentUser.id);
        }
      }
    );
  }

  dislike() {
    this.headlineService.disLikeHeadline(this.currentHeadline).then(
      () => {
        if(this.currentHeadline.disLikes.includes(this.currentUser.id))
        {this.currentHeadline.disLikes.splice(this.currentHeadline.disLikes.indexOf(this.currentUser.id), 1);}
        else
        {
          if(this.currentHeadline.likes.includes(this.currentUser.id)) {
            this.like();
          }
          this.currentHeadline.disLikes.push(this.currentUser.id);
        }
      }
    );
  }

  likeCurrentEditor() {
    const tmpCurrentUser = this.currentUser;
    if(tmpCurrentUser.editorsLikes.includes(this.currentEditor.id)) {
      tmpCurrentUser.editorsLikes.splice(tmpCurrentUser.editorsLikes.indexOf(this.currentEditor.id), 1);
    } else {
      tmpCurrentUser.editorsLikes.push(this.currentEditor.id);
    }
    this.userService.updateCurrentUser(this.currentUser).then(
      () => {
        this.currentUser = tmpCurrentUser;
      }
    );
  }

  archiveCurrentHeadline() {
    const tmpCurrentUser = this.currentUser;
    if(tmpCurrentUser.archives.includes(this.currentHeadline.id)) {
      tmpCurrentUser.archives.splice(tmpCurrentUser.archives.indexOf(this.currentHeadline.id), 1);
    } else {
      tmpCurrentUser.archives.push(this.currentHeadline.id);
    }
    this.userService.updateCurrentUser(this.currentUser).then(
      () => {
        let txt1; let txt2;
        this.translate.get('5.5-2').subscribe((res: string) => { txt1 = res; });
        this.translate.get('5.5-3').subscribe((res: string) => { txt2 = res; });
        this.currentUser = tmpCurrentUser;
        this.alertService.print(tmpCurrentUser.archives.includes(this.currentHeadline.id) ? txt1 : txt2);
      }
    );
  }

}
