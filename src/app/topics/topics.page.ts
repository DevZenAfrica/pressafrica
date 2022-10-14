import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {

  categorieSelect = '';
  currentSegment = '';

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.currentSegment = 'mv';

    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
    });
  }

  segmentChanged(event) {
    this.currentSegment = event.detail.value;
  }

}
