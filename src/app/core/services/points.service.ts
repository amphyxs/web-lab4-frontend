import { Injectable } from '@angular/core';
import { Point, PointData, PointEdit } from '@core/models/point.model';
import { Observable, map, of } from 'rxjs';

/**
 * Сервис получения точек.
 */
@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor() { }

  /**
   * Получить список точек с бэкенда.
   *
   * @returns `Observable` с объектом данных о точке.
   */
  private _getPointsData(): Observable<PointData[]> {
    // TODO: API
    
    return of([
      {
        x: 1,
        y: 1,
        r: 1,
        hit: false,
        createdTimestamp: 31311331,
      },
      {
        x: -1,
        y: 0.5,
        r: 1,
        hit: true,
        createdTimestamp: 313120331,
      },
    ]);
  }

  /**
   * Получить список точек.
   *
   * @returns список из моделей точки.
   */
  public getPoints(): Observable<Point[]> {
    return (
      this._getPointsData()
      .pipe(
        map(pointsData => pointsData.map(data => new Point(data))),
      )
    );
  }

  /**
   * Сохранить пользовательскую точку.
   *
   * @param pointData объект из формы точки.
   */
  public savePoint(pointData: PointEdit): void {
    // TODO: api

    console.log(pointData);
  }
}
