// 一个简单的颜色相关的处理工具

/**
 * 加0补位
 */
const fAddZero = (v: string): string => {
  let newV = `00${v}`;
  return newV.substring(newV.length - 2, newV.length);
};

/**
 * rgb转hex
 */
const fColorToHex = (r: number, g: number, b: number): string => `#${fAddZero(r.toString(16))}${fAddZero(g.toString(16))}${fAddZero(b.toString(16))}`;

/**
 * 解析rgb格式
 */
const fAnalysisRGB = (temp: string): Array<number> => {
  let colorTemp = temp.toLowerCase().substring(1, temp.length);
  let colors = [];
  colors.push(parseInt(colorTemp.substring(0, 2), 16));
  colors.push(parseInt(colorTemp.substring(2, 4), 16));
  colors.push(parseInt(colorTemp.substring(4, 6), 16));
  return colors;
};

/**
 * @description
 * 颜色渐变
 * @param {startColor:string} 起始色值
 * @param {endColor:string} 结束色值
 * @param {num:number} 渐变数量
 * @returns {Array<string>} 产生的渐变色数组(16进制色值)
 */
const fColorGradualChange = (startColor: string, endColor: string, num: number): Array<string> => {
  let rgb = /^rgb|RGB\((([0-9]|[1-9]\d|1\d\d|2([0-4]\d|5[0-5])),){2}([0-9]|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\)$/; // rgb
  let hex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i; // 16进制
  // 颜色预处理
  let startRGB: number[] = [];
  let endRGB: number[] = [];
  if (hex.test(startColor)) {
    startRGB = fAnalysisRGB(startColor);
  } else if (rgb.test(startColor)) {
    startRGB = startColor
      .substring(3, 15)
      .split(',')
      .map((item: string): number => parseInt(item));
  }
  if (hex.test(endColor)) {
    endRGB = fAnalysisRGB(endColor);
  } else if (rgb.test(startColor)) {
    endRGB = endColor
      .substring(3, 15)
      .split(',')
      .map((item: string): number => parseInt(item));
  }
  let startR: number = startRGB[0];
  let startG: number = startRGB[1];
  let startB: number = startRGB[2];
  let endR: number = endRGB[0];
  let endG: number = endRGB[1];
  let endB: number = endRGB[2];
  let sR: number = (endR - startR) / num;
  let sG: number = (endG - startG) / num;
  let sB: number = (endB - startB) / num;
  let colors: string[] = [];
  for (let i = 0; i < num; i++) {
    colors.push(fColorToHex(Math.floor(sR * i + startR), Math.floor(sG * i + startG), Math.floor(sB * i + startB)));
  }
  return colors;
};

/**
 * @description
 * 16进制色值转化为RGB值数组[R,G,B]
 * 若是传入色值不符合要求默认返回[255,0,0]
 *
 * @param hexColor 16进制色值
 * @returns {number[]} RGB各值数组
 */
const hexToRgb = (hexColor: string): number[] => {
  let sColor: string = hexColor.toLowerCase();
  // 十六进制颜色值的正则表达式
  let reg: RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew: string = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    let sColorChange: number[] = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return sColorChange;
  }
  return [255, 0, 0];
};

/**
 * @description
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @param {number[]} RGB色值数组
 * @returns {Array<number>} HSL各值数组
 */
const rgbToHsl = (rgb: number[]): Array<number> => {
  let r: number = rgb[0];
  let g: number = rgb[1];
  let b: number = rgb[2];
  r /= 255;
  g /= 255;
  b /= 255;
  let max: number = Math.max(r, g, b);
  let min: number = Math.min(r, g, b);
  let h: number = 0;
  let s: number = 0;
  let l: number = (max + min) / 2;
  if (max === min) {
    h = 0; // achromatic
    s = 0;
  } else {
    let d: number = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

/**
 * 获取HSL色值
 * @param {value:number} 1-100数值
 * @returns {Array<number>} [H,S,L]
 */
export const getHslColor = (value: number): Array<number> => {
  let step = 10;
  let colorZone: number = Math.floor(value / step);
  let index: number = value % step;
  let s: string[];
  switch (colorZone) {
    case 0:
      s = fColorGradualChange('#FF0000', '#FF9A00', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 1:
      s = fColorGradualChange('#FF9A00', '#CCFF00', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 2:
      s = fColorGradualChange('#CCFF00', '#33FF00', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 3:
      s = fColorGradualChange('#33FF00', '#00FF67', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 4:
      s = fColorGradualChange('#00FF67', '#00FFFF', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 5:
      s = fColorGradualChange('#00FFFF', '#0066FF', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 6:
      s = fColorGradualChange('#0066FF', '#3300FF', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 7:
      s = fColorGradualChange('#3300FF', '#CC00FF', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 8:
      s = fColorGradualChange('#CC00FF', '#FF0099', step);
      return rgbToHsl(hexToRgb(s[index]));
    case 9:
      s = fColorGradualChange('#FF0099', '#FF0000', step);
      return rgbToHsl(hexToRgb(s[index]));
    default:
      return rgbToHsl(hexToRgb('#FF0000'));
  }
};

/**
 * 获取16进制格式色值
 * @param {value} 色值在滑块上的值,1-100
 * @returns {string} 16进制Hex色值
 */
export const getHexColor = (value: number): string => {
  let step = 10;
  let colorZone: number = Math.floor(value / step);
  let index: number = value % step;
  let s: string[];
  switch (colorZone) {
    case 0:
      s = fColorGradualChange('#FF0000', '#FF9A00', step);
      return s[index];
    case 1:
      s = fColorGradualChange('#FF9A00', '#CCFF00', step);
      return s[index];
    case 2:
      s = fColorGradualChange('#CCFF00', '#33FF00', step);
      return s[index];
    case 3:
      s = fColorGradualChange('#33FF00', '#00FF67', step);
      return s[index];
    case 4:
      s = fColorGradualChange('#00FF67', '#00FFFF', step);
      return s[index];
    case 5:
      s = fColorGradualChange('#00FFFF', '#0066FF', step);
      return s[index];
    case 6:
      s = fColorGradualChange('#0066FF', '#3300FF', step);
      return s[index];
    case 7:
      s = fColorGradualChange('#3300FF', '#CC00FF', step);
      return s[index];
    case 8:
      s = fColorGradualChange('#CC00FF', '#FF0099', step);
      return s[index];
    case 9:
      s = fColorGradualChange('#FF0099', '#FF0000', step);
      return s[index];
    default:
      return '#FF0000';
  }
};
