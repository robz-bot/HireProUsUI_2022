import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateReportComponent } from './candidate-report.component';

describe('CandidateReportComponent', () => {
  let component: CandidateReportComponent;
  let fixture: ComponentFixture<CandidateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
