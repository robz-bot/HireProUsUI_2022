import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenchCandidateComponent } from './add-bench-candidate.component';

describe('AddBenchCandidateComponent', () => {
  let component: AddBenchCandidateComponent;
  let fixture: ComponentFixture<AddBenchCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBenchCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenchCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
