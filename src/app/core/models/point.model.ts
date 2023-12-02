/**
 * Данные о точке.
 */
export interface PointData {
  x: number;
  y: number;
  r: number;
  hit: boolean;
}

/**
 * Модель точки.
 */
export class Point {
  public x: number;

  public y: number;

  public r: number;

  public hit: boolean;

  constructor(data: PointData) {
    this.x = data.x;
    this.y = data.y;
    this.r = data.r;
    this.hit = data.hit;
  }

  /**
   * Получить реальную координату точки в зависимости от значения R на графике
   *
   * @param coord значение координаты
   * @param plotR текущее значение R, при котором вычисляется координата
   * @returns реальная координата для отображения
   */
  private _calculateCoordOnPlot(coord: number, plotR: number): number {
    return (coord / this.r) * plotR;
  }

  /**
   * Получить координаты точки для некоторого выставленного R на графике
   *
   * @param plotR текущее значение R, при котором вычисляется координата
   * @returns массив из значений X и Y с реальными координатами
   */
  public getCoordsOnPlot(plotR: number): [number, number] {
    return [
      this._calculateCoordOnPlot(this.x, plotR),
      this._calculateCoordOnPlot(this.y, plotR),
    ];
  }
}
