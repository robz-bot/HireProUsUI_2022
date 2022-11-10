import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommingSoonComponent } from './report-comming-soon.component';

describe('ReportCommingSoonComponent', () => {
  let component: ReportCommingSoonComponent;
  let fixture: ComponentFixture<ReportCommingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCommingSoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
