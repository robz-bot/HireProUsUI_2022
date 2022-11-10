import { TestBed } from '@angular/core/testing';

import { MenuMappingService } from './menu-mapping.service';

describe('MenuMappingService', () => {
  let service: MenuMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
