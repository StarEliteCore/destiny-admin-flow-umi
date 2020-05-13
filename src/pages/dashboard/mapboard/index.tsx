import { Card, Spin } from 'antd';
import { ConnectProps, Dispatch, Loading, MapboardModelState, connect } from 'umi';
import React, { Component, Suspense } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

interface MapboardProps extends Partial<ConnectProps> {
  mapboard: MapboardModelState;
  dispatch: Dispatch;
  loading: boolean;
}
interface MapboardState {}

class Mapboard extends Component<MapboardProps, MapboardState> {
  constructor(props: Readonly<MapboardProps>) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    const suspenseFallback = () => (
      <div style={{ paddingTop: 30, textAlign: 'center' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
    return (
      <React.Fragment>
        <Suspense fallback={suspenseFallback}>
          <Card>功能开发中</Card>
        </Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ mapboard, loading }: { mapboard: MapboardModelState; loading: Loading }) => ({
  mapboard,
  loading: loading.models.mapboard
}))(Mapboard);
