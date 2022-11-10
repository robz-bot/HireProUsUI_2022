import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobRequestComponent } from './add-job-request.component';

describe('AddJobRequestComponent', () => {
  let component: AddJobRequestComponent;
  let fixture: ComponentFixture<AddJobRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
