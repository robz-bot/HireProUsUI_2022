import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireprosFeedbackComponent } from './hirepros-feedback.component';

describe('HireprosFeedbackComponent', () => {
  let component: HireprosFeedbackComponent;
  let fixture: ComponentFixture<HireprosFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireprosFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireprosFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
