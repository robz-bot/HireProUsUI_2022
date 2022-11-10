import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPanelComponent } from './interview-panel.component';

describe('InterviewPanelComponent', () => {
  let component: InterviewPanelComponent;
  let fixture: ComponentFixture<InterviewPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
