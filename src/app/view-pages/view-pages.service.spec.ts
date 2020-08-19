import { TestBed } from '@angular/core/testing';

import { ViewPagesService } from './view-pages.service';

describe('ViewPagesService', () => {
  let service: ViewPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
