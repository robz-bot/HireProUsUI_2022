import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorForgetPasswordComponent } from './vendor-forget-password.component';

describe('VendorForgetPasswordComponent', () => {
  let component: VendorForgetPasswordComponent;
  let fixture: ComponentFixture<VendorForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
