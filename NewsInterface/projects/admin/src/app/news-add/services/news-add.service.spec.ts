import { TestBed } from '@angular/core/testing';

import { NewsAddService } from './news-add.service';

describe('NewsAddService', () => {
  let service: NewsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
