import { TestBed } from '@angular/core/testing';

import { GlobalMenuMappingServicesService } from './global-menu-mapping-services.service';

describe('GlobalMenuMappingServicesService', () => {
  let service: GlobalMenuMappingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalMenuMappingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
