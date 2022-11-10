import { TestBed } from '@angular/core/testing';

import { MasterserviceService } from './masterservice.service';

describe('MasterserviceService', () => {
  let service: MasterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
