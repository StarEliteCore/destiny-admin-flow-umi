//#region StringConstructor
/**
 * 获取任意长度随机字符串
 * @param expect 字符串长度,默认长度16
 */
String.random = function (expect: number = 16): string {
  let str: string = Math.random().toString(36).substring(2);
  while (str.length < expect) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, expect);
};
//#endregion

//#region String Extension
/**
 * 判断字符串是否为空或者空字符串
 */
String.prototype.isNullOrEmpty = function (): boolean {
  return this === undefined || this === null || typeof this === 'undefined' || this === '' ? true : this.trim().length === 0;
};
/**
 * 使用正则表达式验证当前字符串
 */
String.prototype.test = function (reg: RegExp): boolean {
  try {
    return reg.test(this.valueOf());
  } catch (error) {
    throw error;
  }
};
/**
 * 是否是Url
 */
String.prototype.isUrl = function (): boolean {
  return this.test(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/);
};
/**
 * 按指定长度分段字符串
 * @param len:number 指定长度(正整数)
 * @returns Array<string> (字符串数组)
 */
String.prototype.segment = function (len: number): Array<string> {
  if (this.isNullOrEmpty() || len <= 0) return [];
  let array: Array<string> = [];
  let length: number = this.length;
  for (let i: number = 0; i < length / len; i++) {
    if ((i + 1) * len > length) array.push(this.substring(i * len, length));
    else array.push(this.substring(i * len, (i + 1) * len));
  }
  return array;
};
/**
 * 从某进制转换到10进制,默认10进制
 * @param radix 源进制,默认10进制
 */
String.prototype.toNumber = function (radix: number = 10): number {
  try {
    return parseInt(this.valueOf(), radix);
  } catch (error) {
    throw error;
  }
};
//#endregion
