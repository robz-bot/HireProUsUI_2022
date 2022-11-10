import { TestBed } from '@angular/core/testing';

import { LevelupserviceService } from './levelupservice.service';

describe('LevelupserviceService', () => {
  let service: LevelupserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelupserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
