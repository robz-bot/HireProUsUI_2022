import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentMenusComponent } from './recruitment-menus.component';

describe('RecruitmentMenusComponent', () => {
  let component: RecruitmentMenusComponent;
  let fixture: ComponentFixture<RecruitmentMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
