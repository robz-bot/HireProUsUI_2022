import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireproRolesComponent } from './hirepro-roles.component';

describe('HireproRolesComponent', () => {
  let component: HireproRolesComponent;
  let fixture: ComponentFixture<HireproRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireproRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireproRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
