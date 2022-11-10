import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusRecroleMappingComponent } from './cus-recrole-mapping.component';

describe('CusRecroleMappingComponent', () => {
  let component: CusRecroleMappingComponent;
  let fixture: ComponentFixture<CusRecroleMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusRecroleMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusRecroleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
