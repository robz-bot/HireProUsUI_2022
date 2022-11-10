import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewScheduleSummaryReportComponent } from './interview-schedule-summary-report.component';

describe('InterviewScheduleSummaryReportComponent', () => {
  let component: InterviewScheduleSummaryReportComponent;
  let fixture: ComponentFixture<InterviewScheduleSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewScheduleSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewScheduleSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
