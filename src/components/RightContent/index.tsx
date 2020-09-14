import { SelectLang, useModel } from 'umi';

import AvatarDropdown from './AvatarDropdown';
import React from 'react';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <div className={className}>
      <AvatarDropdown menu />
      <SelectLang className={styles.action} />
    </div>
  );
};
export default GlobalHeaderRight;
