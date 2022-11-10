import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedCandidatesListComponent } from './passed-candidates-list.component';

describe('PassedCandidatesListComponent', () => {
  let component: PassedCandidatesListComponent;
  let fixture: ComponentFixture<PassedCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
