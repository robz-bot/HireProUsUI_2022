import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReqStatusReportComponent } from './job-req-status-report.component';

describe('JobReqStatusReportComponent', () => {
  let component: JobReqStatusReportComponent;
  let fixture: ComponentFixture<JobReqStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReqStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReqStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
