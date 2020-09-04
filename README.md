![CI](https://github.com/DestinyCore/destiny-admin-flow-umi/workflows/CI/badge.svg?branch=master)

# destiny-admin-flow-umi

🐕 [后端项目链接](https://github.com/GeorGeWzw/Destiny.Core.Flow)

✔ [后端 API 链接](http://1065.cloud:9602/index.html)

## 简要说明

感兴趣的可以查看 API 并通过 PR 的方式贡献一些代码.尝试使用 V5 的特性来实现功能.

由于动态主题对编译速度造成较大影响,在仓库中的代码默认不带动态主题相关内容. 若是需要动态主题切换,请执行如下代码

```bash
yarn add umi-plugin-antd-theme umi-plugin-setting-drawer
```

然后修改 src/app.tsx 中 getInitialState 函数,调整为如下内容,Promise 中添加 seetingDrawer,并在 return 中返回 settingDrawer: { hideCopyButton: true, hideHintAlert: true } 函数中其他内容可能会出现变动,需要大佬们自己看下代码自己添加.

```typescript
import { SettingDrawerProps } from '@ant-design/pro-layout';
```

```typescript
export const getInitialState = async (): Promise<{
  currentUser?: Types.CurrentUser;
  settings?: LayoutSettings;
  settingDrawer?: SettingDrawerProps;
}> => {
  try {
    // 如果是登录页面，不执行
    if (history.location.pathname !== '/login') {
      let userid: string = Cookies.get('userId') ?? '';
      const response: Types.AjaxResult = await LoadUser({ id: userid });
      const userInfo: Types.UserTable = response.data;
      const { nickName } = userInfo;
      return {
        currentUser: { name: nickName ?? '默认用户名', userid, avatar: AvatarGif },
        settings: defaultSettings,
        settingDrawer: {
          hideCopyButton: true,
          hideHintAlert: true
        }
      };
    } else {
      const perDate: undefined | string = Cookies.get('date');
      const isExpired = Date.now() - parseInt(perDate ?? '0') < ExpiredTime;
      if (!isExpired) {
        message.info('登陆信息已过期,请重新登陆.');
        history.push('/login');
      }
    }
  } catch (error) {
    history.push('/login');
  }
  return { settings: defaultSettings };
};
```

### 脚本命令

#### yarn install

安装项目所需依赖包.

#### yarn start

启动项目,启动成功后打开浏览器,在[本地](http://localhost:8848)打开项目进行预览开发.

#### yarn build

构建项目,打包项目到静态资源文件.

### yarn postinstall

Umi 运行时导出构建,声明新的 Hooks 后,编辑器及 Umi 在编译前无法识别,会产生异常.使用该命令进行编译后即可解决.

#### yarn analyze

项目分析,用于分析项目各个资源占的大小,用于优化分析.

#### yarn upgrade-interactive

使用 yarn 更新项目依赖包.做开发建议经常更新依赖,这样不仅能解决一些 bug,特别是 antd 组件,每次更新都能修复大量 bug.

#### yarn set version berry

更新 yarn 2 自身
