import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppedCandidatesListComponent } from './dropped-candidates-list.component';

describe('DroppedCandidatesListComponent', () => {
  let component: DroppedCandidatesListComponent;
  let fixture: ComponentFixture<DroppedCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroppedCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppedCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
