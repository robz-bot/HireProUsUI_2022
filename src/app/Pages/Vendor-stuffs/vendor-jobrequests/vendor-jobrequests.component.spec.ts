import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorJobrequestsComponent } from './vendor-jobrequests.component';

describe('VendorJobrequestsComponent', () => {
  let component: VendorJobrequestsComponent;
  let fixture: ComponentFixture<VendorJobrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorJobrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorJobrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
