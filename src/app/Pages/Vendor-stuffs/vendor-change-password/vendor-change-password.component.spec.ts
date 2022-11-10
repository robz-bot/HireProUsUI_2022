import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorChangePasswordComponent } from './vendor-change-password.component';

describe('VendorChangePasswordComponent', () => {
  let component: VendorChangePasswordComponent;
  let fixture: ComponentFixture<VendorChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
