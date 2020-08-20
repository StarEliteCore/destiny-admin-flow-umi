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
