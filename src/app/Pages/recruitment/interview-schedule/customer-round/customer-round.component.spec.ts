import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRoundComponent } from './customer-round.component';

describe('CustomerRoundComponent', () => {
  let component: CustomerRoundComponent;
  let fixture: ComponentFixture<CustomerRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
