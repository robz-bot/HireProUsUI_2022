import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveluploginComponent } from './leveluplogin.component';

describe('LeveluploginComponent', () => {
  let component: LeveluploginComponent;
  let fixture: ComponentFixture<LeveluploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeveluploginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveluploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
