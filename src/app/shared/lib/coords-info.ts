/**
* Общие данные о координатных осях.
*/

/**
 * Значения.
 */
export interface Values {
  default?: number;
}

/**
 * Дискретные значения, т.е. величина принимает значения в конкретных точках.
 */
export interface DiscreteValues extends Values {
  availableValues: number[];
  isDiscrete: true;
}

/**
 * Диапазон значений [start; end].
 * 
 * Если граница равна `null`, то это воспринимается как отсутствие границы (бесконечность).
 */
export interface RangeValues extends Values {
  start?: number;
  end?: number;
}

/**
 * Значения по оси X.
 */
export const xAxis: DiscreteValues = {
  availableValues: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
  isDiscrete: true,
}

/**
 * Значения по оси Y.
 */
export const yAxis: RangeValues = {
  start: -3 + Number.EPSILON,  // Добавляем очень малую величину, чтобы сделать границу выколотой
  end: 5 - Number.EPSILON,
};

/**
 * Значения R.
 */
export const rAxis: DiscreteValues = {
  availableValues: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
  isDiscrete: true,
  default: 1,
}

/**
 * Сделать значение дискретным.
 * 
 * @param value значение
 * @param valuesSet допустимые дискретные значения
 * @returns наиболее близкое дискретное значение из `valuesSet` к `value`
 */
export function makeValueDiscrete(value: number, valuesSet: any): number {
  const lastBound = valuesSet.availableValues[valuesSet.availableValues.length - 1];
  let result = value;
  
  if (value > lastBound) {
    result = lastBound
  } else {
    for (const coordBound of valuesSet.availableValues) {
      if (result <= coordBound) {
        result = coordBound;
        break;
      }
    }
  }

  return result;
}

/**
 * Узнать, диксретный ли тип значений у величины.
 *
 * @param values объект значений
 * @returns дискретные ли значения у объекта
 */
export function isDiscreteValues(values: Values): boolean {
  return 'isDiscrete' in values;
}

/**
 * Провести валидация значения в зависимости от типа допустимых значений.
 *
 * @param valuesInfo допустимые значения (например, объект `DiscreteValues` или `RangeValues`)
 * @param value значение для валидации
 * @returns прошло ли значение валидацию
 */
export function validateValue(valuesInfo: Values, value?: number): boolean {
  if (value == undefined)
    return false;

  if (isDiscreteValues(valuesInfo)) {
    const discreteValuesInfo = valuesInfo as DiscreteValues;
    return discreteValuesInfo.availableValues.includes(value);
  } else {
    const rangeValuesInfo = valuesInfo as RangeValues;
    let isInsideRange = true;
    if (rangeValuesInfo.start != undefined)
      isInsideRange = isInsideRange && rangeValuesInfo.start <= value;
    if (rangeValuesInfo.end != undefined)
      isInsideRange = isInsideRange && rangeValuesInfo.end >= value;

    return isInsideRange;
  }
}
