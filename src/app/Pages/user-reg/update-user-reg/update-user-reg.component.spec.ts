import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserRegComponent } from './update-user-reg.component';

describe('UpdateUserRegComponent', () => {
  let component: UpdateUserRegComponent;
  let fixture: ComponentFixture<UpdateUserRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
