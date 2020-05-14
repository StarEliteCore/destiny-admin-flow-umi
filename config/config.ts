// https://umijs.org/config/

import defaultSettings from './default.config';
import { defineConfig } from 'umi';
import { routerConfig } from './router.config';

export default defineConfig({
  hash: true,
  antd: { dark: false },
  // dva: { hmr: true },
  layout: { name: defaultSettings.title, locale: true },
  locale: { default: 'zh-CN', antd: true, baseNavigator: true },
  dynamicImport: { loading: '@/components/PageLoading' },
  targets: { ie: 11 },
  // umi routes: https://umijs.org/docs/routing
  routes: routerConfig,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: { 'primary-color': defaultSettings.primaryColor },
  favicon: './favicon.svg',
  ignoreMomentLocale: true,
  history: { type: 'hash' },
  outputPath: './dist',
  manifest: { basePath: '/' }
});
