import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewlistComponent } from './reviewlist.component';

describe('ReviewlistComponent', () => {
  let component: ReviewlistComponent;
  let fixture: ComponentFixture<ReviewlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
