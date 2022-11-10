import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterviewPanelComponent } from './update-interview-panel.component';

describe('UpdateInterviewPanelComponent', () => {
  let component: UpdateInterviewPanelComponent;
  let fixture: ComponentFixture<UpdateInterviewPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInterviewPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterviewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
