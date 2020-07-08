//#region NumberConstructor
/**
 * 获取最小值到最大值之前的整数随机数
 * @param min: number min  最小值
 * @param max: number max  最大值
 * @returns number 最小值到最大值之前的整数随机数
 */
Number.random = function (min: number, max: number): number {
  return min + Math.round(Math.random() * (max - min));
};
//#endregion

//#region Number Extension
/**
 * 对小数进行四舍五入
 * @param precision 保留位数,默认2位
 */
Number.prototype.round = function (precision: number = 2): number {
  return Math.round(Number(`${+this.valueOf()}e${precision}`)) / Math.pow(10, precision);
};
//#endregion
