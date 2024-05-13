import { TestBed } from '@angular/core/testing';

import { NewsUpdateService } from './news-update.service';

describe('NewsUpdateService', () => {
  let service: NewsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
