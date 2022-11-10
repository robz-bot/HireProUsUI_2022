import { TestBed } from '@angular/core/testing';

import { RecStatusServiceService } from './rec-status-service.service';

describe('RecStatusServiceService', () => {
  let service: RecStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
