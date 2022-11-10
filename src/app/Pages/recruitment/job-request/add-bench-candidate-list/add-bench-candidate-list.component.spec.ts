import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenchCandidateListComponent } from './add-bench-candidate-list.component';

describe('AddBenchCandidateListComponent', () => {
  let component: AddBenchCandidateListComponent;
  let fixture: ComponentFixture<AddBenchCandidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBenchCandidateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenchCandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
