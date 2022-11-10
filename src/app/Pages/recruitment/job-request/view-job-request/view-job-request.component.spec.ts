import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobRequestComponent } from './view-job-request.component';

describe('ViewJobRequestComponent', () => {
  let component: ViewJobRequestComponent;
  let fixture: ComponentFixture<ViewJobRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
