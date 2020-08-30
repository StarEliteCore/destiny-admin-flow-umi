import { Card, Timeline } from 'antd';
import React, { Component } from 'react';

import { PageContainer } from '@ant-design/pro-layout';

class Home extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <PageContainer>
        <Card title="开发线路图">
          <Timeline>
            <Timeline.Item color="green">
              系统管理非IdentityServer4用户角色(已完成)
              <p>用户管理</p>
              <p>角色管理</p>
              <p>菜单管理</p>
              <p>功能管理</p>
              <p>数据字典</p>
            </Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="blue">
              <p>Solve initial network problems 1</p>
              <p>Solve initial network problems 2</p>
              <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
          </Timeline>
        </Card>
      </PageContainer>
    );
  }
}

export default Home;
