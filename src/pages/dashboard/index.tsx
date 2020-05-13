import { Card, Tabs } from 'antd';

import Deviceboard from './deviceboard';
import { IconFont } from '@/utils/utils';
import Mapboard from './mapboard';
import React from 'react';

const Dashboard: React.FC = ({}) => {
  return (
    <Card>
      <Tabs type="card" tabBarGutter={10}>
        <Tabs.TabPane
          tab={
            <span>
              <IconFont type="icon-devicelink" />
              设备看板
            </span>
          }
          key="1"
        >
          <Deviceboard />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <IconFont type="icon-map" />
              地图看板
            </span>
          }
          key="2"
        >
          <Mapboard />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default Dashboard;
