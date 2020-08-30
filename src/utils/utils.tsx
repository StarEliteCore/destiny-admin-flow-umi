// 工具函数文件,用于导出一些工具函数,或者统一处理的相关React组件.所以文件名需要写成tsx并且导入React.

import { LoadingOutlined } from '@ant-design/icons';
import { PaginationProps } from 'antd/lib/pagination';
import React from 'react';
import { parse } from 'querystring';

export const getPageQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');
  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) return parse(href.split('?')[1]);
    return parse(href.slice(qsIndex + 1, sharpIndex));
  }
  return {};
};

export const getImageInfo = (url: string): Promise<{ width: number; height: number }> =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img: HTMLImageElement = new Image();
    img.src = url;
    if (img.naturalWidth || img.complete) resolve({ width: img.naturalWidth ?? img.width, height: img.naturalHeight ?? img.height });
    else {
      img.onload = () => resolve({ width: img.naturalWidth ?? img.width, height: img.naturalHeight ?? img.height });
      img.onerror = err => reject(err);
    }
  });

/**
 * 统一处理表格分页器默认属性
 */
export const tacitPagingProps: PaginationProps = {
  style: { padding: '10px 0 0', textAlign: 'center', float: 'none', marginBottom: 10 },
  showSizeChanger: true,
  showQuickJumper: true
};

/**
 * 统一导出Modal中Form布局的布局参数
 */
export const modalFormLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * 获取统一的表格loading对象
 * @param loading loading状态
 */
export const LoadingObject = (
  loading: boolean
): {
  spinning: boolean;
  indicator: JSX.Element;
} => ({
  spinning: loading,
  indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />
});
