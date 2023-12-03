import { Component, OnDestroy, OnInit } from '@angular/core';
import { Point } from '@core/models/point.model';
import { PointsService } from '@core/services/points.service';
import { rAxis, xAxis } from '@shared/lib/coords-info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * Точки.
   */
  public points: Point[] = [];

  /**
   * Объект подписки на `Observable` списка точек.
   */
  private _pointsSubscription?: Subscription;

  /**
   * Значения X.
   */
  public get xValues(): number[] {
    return xAxis.availableValues;
  }

  /**
   * Значения R.
   */
  public get rValues(): number[] {
    return rAxis.availableValues;
  }

  constructor(
    private _pointsService: PointsService,
  ) { }

  ngOnInit(): void {
    this._getPoints();
  }

  ngOnDestroy(): void {
    if (this._pointsSubscription)
      this._pointsSubscription.unsubscribe();
  }

  /**
   * Получить точки.
   */
  private _getPoints(): void {
    this._pointsSubscription = (
      this._pointsService.getPoints()
        .subscribe(points => {
          this.points = points;
        })
    );
  }

}
