import { TestBed } from '@angular/core/testing';

import { AuthorAddService } from './author-add.service';

describe('AuthorAddService', () => {
  let service: AuthorAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
