import React, { Component } from 'react';

import { Button } from 'antd';
import { MenuButtonAsyncAPI } from '@/services/menu';
import { history } from 'umi';

let button: Array<any> = []
interface IButtonBar {
  getFun: () => void;
}
class ButtonBar extends Component<IButtonBar> {
   constructor(props: IButtonBar) {
    super(props);
    const menustr = window.localStorage.getItem("menu")
    const menu = menustr ? JSON.parse(menustr) : [];
    // debugger
    this.temp(menu);
  }
  private temp=async (menu:any)=>{
      // debugger
      if (menu.length > 0) {
        let index=menu.findIndex((x: any)=>x.routerPath==history.location.pathname.substr(1));
        if(index>=0)
        {
          let model= menu[index]
          let buttonss =await MenuButtonAsyncAPI({ menuid: model.id });
          const { data } = buttonss;
          button=data;
        }
      }
  }
  itemclick: any;//每次设定点击的那个方法
  btnclick = (record: any) => {
    this.itemclick = record;
    //调用父组件的方法，父组件内需要定义一个getFun
    this.props.getFun();
  }
  render() {
    return (
      <div>
        {button.map(item => {
          return (
            <Button
              key={item.path} type={item.icon}
              onClick={() => {
                this.btnclick(item.path);//动态渲染按钮
              }}
            >
              {item.name}
            </Button>
          )
        })}
      </div>
    )
  }
}
export default ButtonBar;