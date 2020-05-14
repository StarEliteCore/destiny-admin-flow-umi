import { LoadingOutlined, createFromIconfontCN } from '@ant-design/icons';
import React, { ReactNode } from 'react';

import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { PaginationProps } from 'antd/lib/pagination';
import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 统一处理表格表头样式.
 * @param name 表头名称
 */
export const getTitle = (name: string): ReactNode => <div style={{ fontWeight: 'bold' }}>{name}</div>;

/**
 * 统一处理表格分页器
 * @param pagination 分页数据
 * @param onShowSizeChange 显示数量发生变化
 * @param onChange 切换页数
 */
export const getPaginationProps = (pagination: { current: number; total: number; pageSize: number; pageCount: number }, onShowSizeChange: (current: number, size: number) => void, onChange: (page: number, pageSize?: number | undefined) => void): PaginationProps => ({
  style: { padding: '10px 0 0', textAlign: 'center', float: 'none', marginBottom: '10px' },
  current: pagination.current,
  total: pagination.total,
  defaultCurrent: 1,
  pageSize: pagination.pageSize,
  showSizeChanger: true,
  showQuickJumper: true,
  onShowSizeChange,
  onChange,
  showTotal: () => `共 ${pagination.total} 条 第 ${pagination.current} / ${pagination.pageCount} 页`
});

interface IconFontProps extends IconBaseProps {
  type: string;
}
/**
 * 使用IconFont字体图标
 */
export const IconFont: React.FC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1709014_wl3qyrmbhuo.js'
});

/**
 * 获取统一的表格loading对象
 * @param loading loading状态
 */
export const LoadingObject = (
  loading: boolean
): {
  spinning: boolean;
  indicator: JSX.Element;
} => {
  return {
    spinning: loading,
    indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />
  };
};

/**
 * 获取一个自定义长度的随机字符串,默认16位长度
 */
export const GetKey = (expect: number = 16): string => {
  let str = Math.random().toString(36).substring(2);
  while (str.length < expect) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, expect);
};

/**
 * 按指定长度分段字符串
 * @param {str:string} 传入的字符串(非空)
 * @param {num:number} 指定长度(正整数)
 * @returns Array<string> (字符串数组)
 */
export const fixedLengthFormatString = (str: string, num: number): Array<string> => {
  if (str === null || str === undefined) return [];
  if (!/^[0-9]*[1-9][0-9]*$/.test(num.toString())) return [];
  let array: string[] = [];
  let len: number = str.length;
  for (let i: number = 0; i < len / num; i++) {
    if ((i + 1) * num > len) array.push(str.substring(i * num, len));
    else array.push(str.substring(i * num, (i + 1) * num));
  }
  return array;
};

/**
 * 获取最小值到最大值之前的整数随机数
 * @param {Min: number} Min  最小值
 * @param {Max: number} Max  最大值
 * @returns {number} 最小值到最大值之前的整数随机数
 */
export const getRandomNum = (Min: number, Max: number): number => {
  let Range = Max - Min;
  let Rand = Math.random();
  return Min + Math.round(Rand * Range);
};
