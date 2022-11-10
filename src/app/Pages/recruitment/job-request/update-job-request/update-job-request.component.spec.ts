import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobRequestComponent } from './update-job-request.component';

describe('UpdateJobRequestComponent', () => {
  let component: UpdateJobRequestComponent;
  let fixture: ComponentFixture<UpdateJobRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJobRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJobRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
