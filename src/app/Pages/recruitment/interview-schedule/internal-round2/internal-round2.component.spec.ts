import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRound2Component } from './internal-round2.component';

describe('InternalRound2Component', () => {
  let component: InternalRound2Component;
  let fixture: ComponentFixture<InternalRound2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalRound2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalRound2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
