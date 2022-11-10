import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistedCandidateReportComponent } from './shortlisted-candidate-report.component';

describe('ShortlistedCandidateReportComponent', () => {
  let component: ShortlistedCandidateReportComponent;
  let fixture: ComponentFixture<ShortlistedCandidateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlistedCandidateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedCandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
