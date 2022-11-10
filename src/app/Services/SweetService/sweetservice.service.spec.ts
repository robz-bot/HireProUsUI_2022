import { TestBed } from '@angular/core/testing';

import { SweetserviceService } from './sweetservice.service';

describe('SweetserviceService', () => {
  let service: SweetserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
