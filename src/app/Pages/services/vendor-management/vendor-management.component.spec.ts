import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagementComponent } from './vendor-management.component';

describe('VendorManagementComponent', () => {
  let component: VendorManagementComponent;
  let fixture: ComponentFixture<VendorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
