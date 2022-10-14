import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrintMostHeadlineViewedComponent } from './print-most-headline-viewed.component';

describe('PrintMostHeadlineViewedComponent', () => {
  let component: PrintMostHeadlineViewedComponent;
  let fixture: ComponentFixture<PrintMostHeadlineViewedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMostHeadlineViewedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrintMostHeadlineViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
