import React, { Component } from 'react';

import { Button } from 'antd';
import { MenuButtonAsyncAPI } from '@/services/menu';
import { history } from 'umi';

let button: Array<any> = [];
interface IButtonBar {
  getFun: () => void;
}
class ButtonBar extends Component<IButtonBar> {
  constructor(props: IButtonBar) {
    super(props);
    const menustr = window.localStorage.getItem('menulist');
    const menu = menustr ? JSON.parse(menustr) : [];
    // debugger
    this.temp(menu);
  }
  private temp = async (menu: any) => {
    // debugger
    if (menu.length > 0) {
      let index = menu.findIndex((x: any) => x.routerPath == history.location.pathname.substr(1));
      if (index >= 0) {
        let model = menu[index];
        let buttonss = await MenuButtonAsyncAPI({ menuid: model.id });
        const { data } = buttonss;
        button = data;
      }
    }
  };
  itemclick: any; //每次设定点击的那个方法
  btnClick = (record: any) => {
    this.itemclick = record;
    //调用父组件的方法，父组件内需要定义一个getFun
    this.props.getFun();
  };
  render() {
    // const { getFun } = this.props;
    return (
      <div style={{ margin: 10 }}>
        {button.map(item => {
          return (
            <Button
              style={{ marginRight: 10, marginBottom: 5 }}
              key={item.path}
              type={item.icon}
              onClick={() => {
                this.btnClick(item.path);
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    );
  }
}
export default ButtonBar;
