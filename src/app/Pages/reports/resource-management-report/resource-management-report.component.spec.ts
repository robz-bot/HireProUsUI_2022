import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManagementReportComponent } from './resource-management-report.component';

describe('ResourceManagementReportComponent', () => {
  let component: ResourceManagementReportComponent;
  let fixture: ComponentFixture<ResourceManagementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceManagementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
