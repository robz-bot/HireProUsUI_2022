import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfigReportComponent } from './email-config-report.component';

describe('EmailConfigReportComponent', () => {
  let component: EmailConfigReportComponent;
  let fixture: ComponentFixture<EmailConfigReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfigReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfigReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
