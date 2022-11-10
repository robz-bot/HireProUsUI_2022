import { TestBed } from '@angular/core/testing';

import { EntryLoginServicesService } from './entry-login-services.service';

describe('EntryLoginServicesService', () => {
  let service: EntryLoginServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryLoginServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
