import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotshortlistedCandidateReportComponent } from './notshortlisted-candidate-report.component';

describe('NotshortlistedCandidateReportComponent', () => {
  let component: NotshortlistedCandidateReportComponent;
  let fixture: ComponentFixture<NotshortlistedCandidateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotshortlistedCandidateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotshortlistedCandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
