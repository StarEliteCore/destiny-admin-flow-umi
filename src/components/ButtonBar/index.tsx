import React,{Component} from 'react';

import { Button } from 'antd';
import { history } from 'umi';

const button:Array<{key:string,clickName:string,style:string}>=[
  {key:"add",clickName:"add",style:"1231"},
  {key:"update",clickName:"update",style:"1231"},
]
class ButtonBar extends Component{
    constructor(props: Readonly<{}>){
        super(props);
        console.log(history.location.pathname)
    }
    itemclick:any;//每次设定点击的那个方法
    btnclick=  (record:any) =>{
      this.itemclick=record;
      //调用父组件的方法，父组件内需要定义一个getFun
      this.props.getFun();
    }
    render(){
        return(
          <div>
          {button.map(item=>{
            return (
              <Button 
              key={item.key}
              onClick={()=>{
                this.btnclick(item.clickName);//动态渲染按钮
              }}
              >
              {item.key}
              </Button>
            )
          })} 
          </div>
        )
    }
}
export default ButtonBar;