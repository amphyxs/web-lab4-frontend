import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Point, PointData, PointEdit } from '@core/models/point.model';
import { environment } from 'environments/environment';
import { Observable, map, of } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Сервис получения точек.
 */
@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) { }

  /**
   * Получить список точек с бэкенда.
   *
   * @returns `Observable` с объектом данных о точке.
   */
  private _getPointsData(): Observable<PointData[]> {
    const url = `lab4/api/checks/previousChecks`;
    
    return this._http.get<PointData[]>(
      url,
      {
        headers: this._authService.authHeaders,
      },
    );
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
  public savePoint(pointData: PointEdit): Observable<Object> {
    const url = 'lab4/api/checks/check';

    return this._http.post(
      url,
      {
        x: pointData.x,
        y: pointData.y,
        r: pointData.r,
      },
      {
        headers: this._authService.authHeaders,
      },
    );
  }
}
