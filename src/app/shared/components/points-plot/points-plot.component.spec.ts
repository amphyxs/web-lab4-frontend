import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsPlotComponent } from './points-plot.component';

describe('PointsPlotComponent', () => {
  let component: PointsPlotComponent;
  let fixture: ComponentFixture<PointsPlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsPlotComponent]
    });
    fixture = TestBed.createComponent(PointsPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
