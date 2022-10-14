import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewHeadlineViewedPage } from './preview-headline-viewed.page';

describe('PreviewHeadlineViewedPage', () => {
  let component: PreviewHeadlineViewedPage;
  let fixture: ComponentFixture<PreviewHeadlineViewedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewHeadlineViewedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewHeadlineViewedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
