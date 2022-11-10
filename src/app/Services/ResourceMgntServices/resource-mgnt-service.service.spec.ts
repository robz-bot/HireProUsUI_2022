import { TestBed } from '@angular/core/testing';

import { ResourceMgntServiceService } from './resource-mgnt-service.service';

describe('ResourceMgntServiceService', () => {
  let service: ResourceMgntServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceMgntServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
