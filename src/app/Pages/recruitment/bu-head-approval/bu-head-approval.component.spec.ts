import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuHeadApprovalComponent } from './bu-head-approval.component';

describe('BuHeadApprovalComponent', () => {
  let component: BuHeadApprovalComponent;
  let fixture: ComponentFixture<BuHeadApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuHeadApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuHeadApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
