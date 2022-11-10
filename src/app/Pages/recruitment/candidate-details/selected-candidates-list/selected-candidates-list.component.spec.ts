import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCandidatesListComponent } from './selected-candidates-list.component';

describe('SelectedCandidatesListComponent', () => {
  let component: SelectedCandidatesListComponent;
  let fixture: ComponentFixture<SelectedCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
