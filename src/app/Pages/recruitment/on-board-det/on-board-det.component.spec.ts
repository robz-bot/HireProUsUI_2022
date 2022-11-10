import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardDetComponent } from './on-board-det.component';

describe('OnBoardDetComponent', () => {
  let component: OnBoardDetComponent;
  let fixture: ComponentFixture<OnBoardDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardDetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
