import { TestBed } from '@angular/core/testing';

import { LoggedInVendorServiceService } from './logged-in-vendor-service.service';

describe('LoggedInVendorServiceService', () => {
  let service: LoggedInVendorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInVendorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
