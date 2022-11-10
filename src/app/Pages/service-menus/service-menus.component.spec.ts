import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMenusComponent } from './service-menus.component';

describe('ServiceMenusComponent', () => {
  let component: ServiceMenusComponent;
  let fixture: ComponentFixture<ServiceMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
