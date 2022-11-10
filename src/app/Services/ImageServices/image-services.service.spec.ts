import { TestBed } from '@angular/core/testing';

import { ImageServicesService } from './image-services.service';

describe('ImageServicesService', () => {
  let service: ImageServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
