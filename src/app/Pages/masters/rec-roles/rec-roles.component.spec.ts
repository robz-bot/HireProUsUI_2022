import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecRolesComponent } from './rec-roles.component';

describe('RecRolesComponent', () => {
  let component: RecRolesComponent;
  let fixture: ComponentFixture<RecRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
