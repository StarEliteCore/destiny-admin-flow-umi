// https://umijs.org/config/
// Umi框架级配置文件,用于配置Umi框架的一些东东.

import Default from './default';
import Route from './router';
import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  // Ant Design相关配置设置暗黑主题或者紧凑主题
  antd: { dark: false },
  // Ant Design Pro Layout相关配置
  layout: {
    locale: true
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true
  },
  dynamicImport: {
    loading: '@/components/PageLoading'
  },
  // umi routes: https://umijs.org/docs/routing
  routes: Route,
  theme: {
    'primary-color': Default.primaryColor
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // 浏览器标签页图标配置,会生成HTML内容插入到页面中
  favicon: './favicon.svg',
  manifest: {
    basePath: '/'
  }
});
