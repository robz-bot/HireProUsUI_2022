import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCandidatesListComponent } from './upload-candidates-list.component';

describe('UploadCandidatesListComponent', () => {
  let component: UploadCandidatesListComponent;
  let fixture: ComponentFixture<UploadCandidatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCandidatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
