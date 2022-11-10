import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldedCandidatesListComponent } from './holded-candidates-list.component';

describe('HoldedCandidatesListComponent', () => {
  let component: HoldedCandidatesListComponent;
  let fixture: ComponentFixture<HoldedCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldedCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldedCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
