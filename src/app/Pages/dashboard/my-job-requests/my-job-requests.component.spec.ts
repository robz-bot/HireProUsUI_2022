import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobRequestsComponent } from './my-job-requests.component';

describe('MyJobRequestsComponent', () => {
  let component: MyJobRequestsComponent;
  let fixture: ComponentFixture<MyJobRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyJobRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
