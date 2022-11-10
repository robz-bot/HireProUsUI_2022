import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRound1Component } from './internal-round1.component';

describe('InternalRound1Component', () => {
  let component: InternalRound1Component;
  let fixture: ComponentFixture<InternalRound1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalRound1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalRound1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
