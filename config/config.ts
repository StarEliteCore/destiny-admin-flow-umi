import defaultConfig from './default.config';
import { defineConfig } from 'umi';
import { produceVersion } from './version.config';
import { routerConfig } from './router.config';

// const { winPath } = utils;

export default defineConfig({
  routes: routerConfig,
  theme: { 'primary-color': defaultConfig.primaryColor },
  dva: { hmr: true },
  antd: { dark: false },
  locale: { default: 'zh-CN', antd: true, baseNavigator: true },
  dynamicImport: { loading: '@/components/PageLoading' },
  favicon: './favicon.svg',
  title: false,
  hash: true,
  ignoreMomentLocale: true,
  // lessLoader: { javascriptEnabled: true },
  // cssLoader: {
  //   modules: {
  //     getLocalIdent: (context: { resourcePath: string }, _: string, localName: string) => {
  //       if (context.resourcePath.includes('node_modules') || context.resourcePath.includes('ant.design.pro.less') || context.resourcePath.includes('global.less')) return localName;
  //       const match = context.resourcePath.match(/src(.*)/);
  //       if (match && match[1]) {
  //         const antdProPath = match[1].replace('.less', '');
  //         const arr = winPath(antdProPath)
  //           .split('/')
  //           .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
  //           .map((a: string) => a.toLowerCase());
  //         return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
  //       }
  //       return localName;
  //     }
  //   }
  // },
  history: { type: 'hash' },
  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true
  // },
  // publicPath: 'smartlight-web/', // 该路径需要和服务端的文件路径一致
  outputPath: produceVersion ? './produce' : './demonstrative'
});
