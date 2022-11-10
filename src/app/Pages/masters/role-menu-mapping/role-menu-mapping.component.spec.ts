import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuMappingComponent } from './role-menu-mapping.component';

describe('RoleMenuMappingComponent', () => {
  let component: RoleMenuMappingComponent;
  let fixture: ComponentFixture<RoleMenuMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenuMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenuMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
