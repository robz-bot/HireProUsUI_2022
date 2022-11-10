import { TestBed } from '@angular/core/testing';

import { LoginServicesService } from './login-services.service';

describe('LoginServicesService', () => {
  let service: LoginServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
