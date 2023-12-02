import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Coordinates, Point } from '@core/models/point.model';
import { xAxis, makeValueDiscrete, yAxis, isDiscreteValues } from '@shared/lib/coords-info';
import functionPlot from 'function-plot';
import { FunctionPlotOptions, FunctionPlotDatum } from 'function-plot/dist';

/**
 * Компонент графика для точек.
 *
 * Для отображения графика использует библиотеку `function-plot`.
 */
@Component({
  selector: 'app-points-plot',
  templateUrl: './points-plot.component.html',
  styleUrls: ['./points-plot.component.scss']
})
export class PointsPlotComponent implements AfterViewInit {
  
  /**
   * Точки для отображения.
   */
  @Input() points: Point[] = [];

  /**
   * Текущее значение R.
   */
  @Input() rValue: number = 1;

  /**
   * Событие, когда мы хотим обновить координаты точки.
   * 
   * Например, при клике по графику сюда передадутся координаты клика,
   * чтобы они подставились в форму.
   */
  @Output() updateCoords = new EventEmitter<Coordinates>();

  /**
   * Элемент графика.
   */
  @ViewChild('plot') plotElement!: ElementRef;

  /**
   * Ширина графика.
   */
  private readonly _WIDTH = 400;

  /**
   * Высота графика.
   */
  private readonly _HEIGHT = 400;

  /**
   * Цвета элементов графика.
   */
  private readonly _COLORS = {
    area: '#5E81AC',
    missPoint: '#BF616A',
    hitPoint: '#A3BE8C',
  };
  
  /**
   * Размер точек в пикселях.
   */
  private readonly _POINTS_SIZE_PX = 10;

  /**
   * Последние кооридинаты курсора пользователя.
   */
  private _cursorPosition?: Coordinates;

  /**
   * Получить объект параметров для компонента графика `function-plot`.
   */
  private get _options(): FunctionPlotOptions {
    const r = this.rValue;

    return {
      target: `#${this.plotElement?.nativeElement.id}`,
      width: this._WIDTH,
      height: this._HEIGHT,
      xAxis: { domain: [-3, 3] },
      yAxis: { domain: [-3, 3] },
      grid: true,
      data: [
        {
          fn: `-x + ${r}/2`,
          closed: true,
          skipTip: true,
          range: [0, r/2],
          color: this._COLORS.area,
        },
        {
          fn: `${r}`,
          closed: true,
          skipTip: true,
          range: [-r, 0],
          color: this._COLORS.area,
        },
        {
          fn: `-sqrt(${r}^2 - x^2)`,
          closed: true,
          skipTip: true,
          range: [0, r],
          color: this._COLORS.area,
        },
        this._getPointsOptions('hit'),
        this._getPointsOptions('miss'),
      ],
    };
  }

  /**
   * Обновить значение координат курсора.
   * 
   * @param coords новые координаты.
   */
  private _setCursorPosition(coords: Coordinates): void {
    let { x, y } = coords;

    if (isDiscreteValues(xAxis)) {
      x = makeValueDiscrete(x, xAxis);
    }
    if (isDiscreteValues(yAxis)) {
      y = makeValueDiscrete(y, yAxis);
    }

    this._cursorPosition = { x, y };
  }

  /**
   * Получить объект для `function-plot` для нужного вида точки.
   * 
   * @param isHit тип точек (`hit` - попавшие, `miss` - промахнувшиеся)
   * @returns объект с точками и их настройками
   */
  private _getPointsOptions(type: 'hit' | 'miss'): FunctionPlotDatum {
    let points, color;
  
    switch (type) {
      case 'hit':
        points = this.points.filter(point => point.hit);
        color = this._COLORS.hitPoint;
        break;
      case 'miss':
        points = this.points.filter(point => !point.hit);
        color = this._COLORS.missPoint;
        break;
    }

    return {
      points: points.map(point => point.getCoordsOnPlot(this.rValue)),
      fnType: "points",
      graphType: "scatter",
      color: color,
      attr: {
        "stroke-width": `${this._POINTS_SIZE_PX}px`,
      },
    };
  }

  ngAfterViewInit(): void {
    functionPlot(this._options);
  }

  /**
   * Обработать перемещение курсора пользователя по графику.
   * 
   * @param event событие перемещения курсора
   */
  public onMouseMove(event: MouseEvent): void {
    this._setCursorPosition({ x: event.x, y: event.y });
  }

  /**
   * Обработать клик по графику.
   */
  public onClick(): void {
    this.updateCoords.emit(this._cursorPosition);
  }
}
