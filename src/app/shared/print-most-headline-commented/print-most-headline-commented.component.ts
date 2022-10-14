import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Headline} from "../../models/headline";
import {StorageService} from "../../services/storage.service";
import {HeadlineService} from "../../services/headline.service";
import {EditorService} from "../../services/editor.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-print-most-headline-commented',
  templateUrl: './print-most-headline-commented.component.html',
  styleUrls: ['./print-most-headline-commented.component.scss'],
})
export class PrintMostHeadlineCommentedComponent implements OnInit, OnChanges {

  @Input() idCategory;

  headlinesComment: any[] = [];
  listAllHeadline: Headline[] = [];

  constructor(private commentService: CommentService, private storageService: StorageService, private headlineService: HeadlineService, private editorService: EditorService) { }

  ngOnInit() {
    this.headlineService.getHeadlines().then(
      (data) => {
        const pointe = this;
        this.listAllHeadline = data;
        this.listAllHeadline.forEach(function(doc) {
          pointe.filtreHeadline(doc.idEditor).then(
            (result) => {
              if(result) {
                pointe.commentService.getComments(doc.id).then(
                  (data25) => {
                    if(data25.length > 0) {
                      pointe.headlinesComment.push({
                        comments : data25.length,
                        headlineId: doc.id
                      });
                    }
                  }
                );
              }
            }
          );
        });
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const pointe = this;
    this.headlinesComment = [];
    this.listAllHeadline.forEach(function(doc) {
      pointe.filtreHeadline(doc.idEditor).then(
        (result) => {
          if(result) {
            pointe.commentService.getComments(doc.id).then(
              (data25) => {
                if(data25.length > 0) {
                  pointe.headlinesComment.push({
                    comments : data25.length,
                    headlineId: doc.id
                  });
                }
              }
            );
          }
        }
      );
    });
  }

  trieTableau(tableau: any[]) {
    return tableau.sort((a, b) => a.comments - b.comments).reverse();
  }

  async filtreHeadline(idEditor: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.editorService.getEditorWitchId(idEditor).then(
        (data) => {
          if ((this.idCategory === '' || data.idCategory === this.idCategory) && (!this.storageService.getItem('paysSelect') || data.idCountry.includes(this.storageService.getItem('paysSelect')))) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

}
