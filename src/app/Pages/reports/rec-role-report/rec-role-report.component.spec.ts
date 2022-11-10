import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecRoleReportComponent } from './rec-role-report.component';

describe('RecRoleReportComponent', () => {
  let component: RecRoleReportComponent;
  let fixture: ComponentFixture<RecRoleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecRoleReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecRoleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
