import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneCandidateComponent } from './clone-candidate.component';

describe('CloneCandidateComponent', () => {
  let component: CloneCandidateComponent;
  let fixture: ComponentFixture<CloneCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloneCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
