import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeShortlistComponent } from './resume-shortlist.component';

describe('ResumeShortlistComponent', () => {
  let component: ResumeShortlistComponent;
  let fixture: ComponentFixture<ResumeShortlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeShortlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
