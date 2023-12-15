import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRejectedComponent } from './offer-rejected.component';

describe('OfferRejectedComponent', () => {
  let component: OfferRejectedComponent;
  let fixture: ComponentFixture<OfferRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
