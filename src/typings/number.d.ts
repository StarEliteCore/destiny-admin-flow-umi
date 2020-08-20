interface Number {
  /**
   * 对小数进行四舍五入
   * @param precision 保留位数,默认2位
   */
  round(precision: number = 2): number;
}

interface NumberConstructor {
  /**
   * 获取最小值到最大值之前的整数随机数
   * @param min: number min  最小值
   * @param max: number max  最大值
   * @returns number 最小值到最大值之前的整数随机数
   */
  random(min: number, max: number): number;
}
