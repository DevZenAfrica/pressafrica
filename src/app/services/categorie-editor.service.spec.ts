import { TestBed } from '@angular/core/testing';

import { CategorieEditorService } from './categorie-editor.service';

describe('CategorieEditorService', () => {
  let service: CategorieEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
