import { TestBed } from '@angular/core/testing';

import { RecruitmentServiceService } from './recruitment-service.service';

describe('RecruitmentServiceService', () => {
  let service: RecruitmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
