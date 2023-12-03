import { Component, OnDestroy, OnInit } from '@angular/core';
import { Coordinates, Point, PointEdit } from '@core/models/point.model';
import { PointsService } from '@core/services/points.service';
import { rAxis, validateValue, xAxis, yAxis } from '@shared/lib/coords-info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * Точки.
   */
  public points: Point[] = [];

  /**
   * Текущая редактируемая точка.
   */
  public currentPoint: PointEdit = {};

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

  /**
   * Валидные ли данные в форме.
   */
  public get isFormValid(): boolean {
    const { x, y, r } = this.currentPoint;

    return (
      validateValue(xAxis, x) &&
      validateValue(yAxis, y) &&
      validateValue(rAxis, r) &&
      (r != undefined && r > 0)
    );
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
   * Обработать выбор чекбокса.
   *
   * В этой лабе, к сожалению, чекбоксы - это радиокнопки.
   *
   * @param event событие клика по чекбоксу
   */
  public onCheckboxSelected(event: Event, checkboxType: 'x' | 'r') {
    const checkboxSelected = event.target as HTMLElement;

    const value = Number(checkboxSelected.getAttribute('value'));
    const wasChecked = this.currentPoint[checkboxType] == value;

    if (wasChecked) {
      this.currentPoint[checkboxType] = undefined;
    } else {
      this.currentPoint[checkboxType] = value;
    }
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

  /**
   * Установить текущие координаты точки с тех, что пришли в событии от графика.
   *
   * @param coords координаты с графика (например, при клике)
   */
  public setCoordsFromPlot(coords: Coordinates): void {
    this.currentPoint.x = coords.x;
    this.currentPoint.y = coords.y;
  }

  /**
   * Сохранить текущую точку.
   */
  public onPointFormSubmit(event: Event): void {
    event.preventDefault();
    this._pointsService.savePoint(this.currentPoint);
    // Заново получаем точки
    this._getPoints();
  }

}
