import { TestBed } from '@angular/core/testing';

import { SuggestionServiceService } from './suggestion-service.service';

describe('SuggestionServiceService', () => {
  let service: SuggestionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
