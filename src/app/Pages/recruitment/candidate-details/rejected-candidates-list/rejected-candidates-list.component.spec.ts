import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCandidatesListComponent } from './rejected-candidates-list.component';

describe('RejectedCandidatesListComponent', () => {
  let component: RejectedCandidatesListComponent;
  let fixture: ComponentFixture<RejectedCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
