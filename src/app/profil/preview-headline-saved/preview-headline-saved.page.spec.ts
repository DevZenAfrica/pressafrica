import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewHeadlineSavedPage } from './preview-headline-saved.page';

describe('PreviewHeadlineSavedPage', () => {
  let component: PreviewHeadlineSavedPage;
  let fixture: ComponentFixture<PreviewHeadlineSavedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewHeadlineSavedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewHeadlineSavedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
