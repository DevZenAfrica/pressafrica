import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewHeadlineLikedPage } from './preview-headline-liked.page';

describe('PreviewHeadlineLikedPage', () => {
  let component: PreviewHeadlineLikedPage;
  let fixture: ComponentFixture<PreviewHeadlineLikedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewHeadlineLikedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewHeadlineLikedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
