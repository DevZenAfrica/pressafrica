import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrintMostHeadlineCommentedComponent } from './print-most-headline-commented.component';

describe('PrintMostHeadlineCommentedComponent', () => {
  let component: PrintMostHeadlineCommentedComponent;
  let fixture: ComponentFixture<PrintMostHeadlineCommentedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMostHeadlineCommentedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrintMostHeadlineCommentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
