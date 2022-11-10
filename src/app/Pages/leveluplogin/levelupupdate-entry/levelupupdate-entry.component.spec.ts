import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelupupdateEntryComponent } from './levelupupdate-entry.component';

describe('LevelupupdateEntryComponent', () => {
  let component: LevelupupdateEntryComponent;
  let fixture: ComponentFixture<LevelupupdateEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelupupdateEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelupupdateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
