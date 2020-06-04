import React, { CSSProperties } from 'react';

export interface ColumnTitleProps {
  style?: CSSProperties;
  name: string;
}

/**
 * 统一处理表格表头样式.
 * @param name 表头名称
 */
const ColumnTitle: React.FC<ColumnTitleProps> = ({ style, name }: ColumnTitleProps) => <div style={{ fontWeight: 'bold', ...style }}>{name}</div>;

export default ColumnTitle;
