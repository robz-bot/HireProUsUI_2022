import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementProgressReportComponent } from './requirement-progress-report.component';

describe('RequirementProgressReportComponent', () => {
  let component: RequirementProgressReportComponent;
  let fixture: ComponentFixture<RequirementProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementProgressReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
