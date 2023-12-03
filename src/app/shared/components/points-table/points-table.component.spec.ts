import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsTableComponent } from './points-table.component';

describe('PointsTableComponent', () => {
  let component: PointsTableComponent;
  let fixture: ComponentFixture<PointsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsTableComponent]
    });
    fixture = TestBed.createComponent(PointsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
