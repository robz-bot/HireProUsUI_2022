import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRoundComponent } from './hr-round.component';

describe('HrRoundComponent', () => {
  let component: HrRoundComponent;
  let fixture: ComponentFixture<HrRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
