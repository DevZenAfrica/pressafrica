import { TestBed } from '@angular/core/testing';

import { HeadlineService } from './headline.service';

describe('HeadlineService', () => {
  let service: HeadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
