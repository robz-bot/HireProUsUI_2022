import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidateAiComponent } from './add-candidate-ai.component';

describe('AddCandidateAiComponent', () => {
  let component: AddCandidateAiComponent;
  let fixture: ComponentFixture<AddCandidateAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCandidateAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidateAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
