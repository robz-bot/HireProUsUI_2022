import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMenusComponent } from './master-menus.component';

describe('MasterMenusComponent', () => {
  let component: MasterMenusComponent;
  let fixture: ComponentFixture<MasterMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
