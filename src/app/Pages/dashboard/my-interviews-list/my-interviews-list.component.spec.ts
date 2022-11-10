import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInterviewsListComponent } from './my-interviews-list.component';

describe('MyInterviewsListComponent', () => {
  let component: MyInterviewsListComponent;
  let fixture: ComponentFixture<MyInterviewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInterviewsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInterviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
