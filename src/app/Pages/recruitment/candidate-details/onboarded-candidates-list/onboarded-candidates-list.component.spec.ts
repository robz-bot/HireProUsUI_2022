import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedCandidatesListComponent } from './onboarded-candidates-list.component';

describe('OnboardedCandidatesListComponent', () => {
  let component: OnboardedCandidatesListComponent;
  let fixture: ComponentFixture<OnboardedCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardedCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
