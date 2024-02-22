import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAllocationComponent } from './project-allocation.component';

describe('ProjectAllocationComponent', () => {
  let component: ProjectAllocationComponent;
  let fixture: ComponentFixture<ProjectAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
