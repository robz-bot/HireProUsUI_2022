import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingdashboardComponent } from './ratingdashboard.component';

describe('RatingdashboardComponent', () => {
  let component: RatingdashboardComponent;
  let fixture: ComponentFixture<RatingdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
