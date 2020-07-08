declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

interface CallBackResult {
  /**
   * 状态
   */
  state: boolean;
  /**
   * 消息
   */
  msg: string;
  /**
   * 数据
   */
  data?: any;
}

interface String {
  /**
   * 是否是空字符串或者空
   */
  isNullOrEmpty(): bool;
  /**
   * 对当前字符串进行正则匹配
   * @param reg 正则表达式
   */
  test(reg: RegExp): boolean;
  /**
   * 是否是Url
   */
  isUrl(): boolean;
  /**
   * 按指定长度分段字符串
   * @param len:number 指定长度(正整数)
   * @returns Array<string> (字符串数组)
   */
  segment(len: number): Array<string>;
}

interface StringConstructor {
  /**
   * 获取一个自定义长度的随机字符串,默认16位长度
   */
  random(expect: number = 16): string;
}

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
