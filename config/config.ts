// https://umijs.org/config/
// Umi框架级配置文件,用于配置Umi框架的一些东东.

import defaultSettings from './default';
import { defineConfig } from 'umi';
import { routerConfig } from './router';

export default defineConfig({
  hash: true,
  // Ant Design相关配置设置暗黑主题或者紧凑主题
  antd: { dark: false },
  // Dva相关配置
  // dva: { hmr: true },
  // Ant Design Pro Layout相关配置
  layout: { name: defaultSettings.title, locale: true },
  // 全球化配置
  locale: { default: 'zh-CN', antd: true, baseNavigator: true },
  dynamicImport: { loading: '@/components/PageLoading' },
  // 兼容配置.会和官方默认配置合并.所以不用每个浏览器都写上
  targets: { ie: 11 },
  // 路由信息
  // umi routes: https://umijs.org/docs/routing
  routes: routerConfig,
  // 主题
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: { 'primary-color': defaultSettings.primaryColor },
  // 浏览器标签页图标配置,会生成HTML内容插入到页面中
  favicon: './favicon.svg',
  // 忽略 moment 全球化内容
  ignoreMomentLocale: true,
  // history: { type: 'hash' },
  // 输出目录
  outputPath: './dist',
  manifest: { basePath: '/' }
});
