import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuReportComponent } from './bu-report.component';

describe('BuReportComponent', () => {
  let component: BuReportComponent;
  let fixture: ComponentFixture<BuReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
