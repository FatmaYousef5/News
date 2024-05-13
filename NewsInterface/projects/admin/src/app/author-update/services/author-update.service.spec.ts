import { TestBed } from '@angular/core/testing';

import { AuthorUpdateService } from './author-update.service';

describe('AuthorUpdateService', () => {
  let service: AuthorUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
