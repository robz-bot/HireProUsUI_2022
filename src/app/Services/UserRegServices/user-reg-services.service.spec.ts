import { TestBed } from '@angular/core/testing';

import { UserRegServicesService } from './user-reg-services.service';

describe('UserRegServicesService', () => {
  let service: UserRegServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
