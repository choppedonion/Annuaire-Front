import { TestBed } from '@angular/core/testing';

import { PersonMockService } from './person-mock.service';

describe('PersonMockService', () => {
  let service: PersonMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
