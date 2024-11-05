import { TestBed } from '@angular/core/testing';

import { FirebasesignupService } from './firebasesignup.service';

describe('FirebasesignupService', () => {
  let service: FirebasesignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasesignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
