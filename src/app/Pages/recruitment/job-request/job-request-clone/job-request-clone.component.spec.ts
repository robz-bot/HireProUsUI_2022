import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequestCloneComponent } from './job-request-clone.component';

describe('JobRequestCloneComponent', () => {
  let component: JobRequestCloneComponent;
  let fixture: ComponentFixture<JobRequestCloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRequestCloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequestCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
