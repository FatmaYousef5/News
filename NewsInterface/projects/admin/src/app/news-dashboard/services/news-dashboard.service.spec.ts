import { TestBed } from '@angular/core/testing';

import { NewsDashboardService } from './news-dashboard.service';

describe('NewsDashboardService', () => {
  let service: NewsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
