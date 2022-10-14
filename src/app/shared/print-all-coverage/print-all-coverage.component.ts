import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Coverage} from '../../models/coverage';
import {CoverageService} from '../../services/coverage.service';

@Component({
  selector: 'app-print-all-coverage',
  templateUrl: './print-all-coverage.component.html',
  styleUrls: ['./print-all-coverage.component.scss'],
})
export class PrintAllCoverageComponent implements OnInit, OnChanges {

  @Input() idCategory;
  listeCoverage: Coverage[] = [];
  listeAllCoverage: Coverage[] = [];
  idCat = '';
  cmp = 0;

  constructor(private coverageService: CoverageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit();
    }

  ngOnInit() {
    this.idCat = this.idCategory;
    this.coverageService.getAllCoverage().then(
      (data) => {
        if(this.cmp === 0) {
          this.cmp++;
          this.listeCoverage = data;
        }
      }
    );
  }
}
