import { Card, Col, Row, Spin } from 'antd';
import { ConnectProps, DeviceboardModelState, Dispatch, Loading, connect } from 'umi';
import React, { Component, Suspense } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import { LoadingOutlined } from '@ant-design/icons';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import dayjs from 'dayjs';

interface DeviceboardProps extends Partial<ConnectProps> {
  deviceboard: DeviceboardModelState;
  dispatch: Dispatch;
  loading: boolean;
}
interface DeviceboardState {
  canRefresh: boolean;
}

class Deviceboard extends Component<DeviceboardProps, DeviceboardState> {
  private timer!: NodeJS.Timeout | null;
  constructor(props: Readonly<DeviceboardProps>) {
    super(props);
    this.state = { canRefresh: false };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ canRefresh: false });
    dispatch({ type: 'deviceboard/fetchFloorPowerConsumption' });
    dispatch({ type: 'deviceboard/fetchDeviceStatistic' });
    dispatch({ type: 'deviceboard/fetchDTimeIntervalPower' });
    this.setState({ canRefresh: true });
    this.timer = setInterval(() => this.refresh(), 5 * 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private refresh = (): void => {
    const { dispatch } = this.props;
    const { canRefresh } = this.state;
    if (canRefresh) {
      this.setState({ canRefresh: false });
      dispatch({ type: 'deviceboard/fetchFloorPowerConsumption' });
      dispatch({ type: 'deviceboard/fetchDeviceStatistic' });
      dispatch({
        type: 'deviceboard/fetchDTimeIntervalPower',
        callback: () => this.setState({ canRefresh: true })
      });
    }
  };

  render(): React.ReactNode {
    const {
      deviceboard: { floorPowerConsumptionData, powerConsumptionUnit, installedDeviceCount, installedDevice, onlineState, deviceNumOfUse, timeIntervalPower, consumptionUnit }
    } = this.props;
    const suspenseFallback = () => (
      <div style={{ paddingTop: 30, textAlign: 'center' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
    const getTimeIntervalPower = (data: Array<any>) => {
      let lineData: Array<{ x: string; y: number }> = [];
      for (let index: number = 0, item: any; (item = data[index++]); ) {
        lineData.push({ x: dayjs(item.date).format('mm:ss'), y: item.consumption });
      }
      return { id: 'TimeIntervalPower', color: 'hsl(10, 70%, 50%)', data: lineData };
    };
    const getInstallDevice = () => {
      let keyArray: Array<string> = Object.keys(installedDevice);
      let result: Array<any> = [];
      for (let key in keyArray) {
        result.push({ id: keyArray[key], label: keyArray[key], value: installedDevice[keyArray[key]] });
      }
      return result;
    };

    return (
      <GridContent>
        <Suspense fallback={suspenseFallback}>
          <Row gutter={24}>
            <Col span={8}>
              <Card bordered={false} title="楼层电量统计" headStyle={{ height: 50 }} bodyStyle={{ height: 320 }}>
                <ResponsiveBar
                  data={floorPowerConsumptionData}
                  keys={['totalPowerConsumption']}
                  indexBy="floorName"
                  margin={{ bottom: 30, left: 70 }}
                  groupMode="grouped"
                  colors={{ scheme: 'nivo' }}
                  axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                  axisLeft={{
                    legend: powerConsumptionUnit,
                    legendOffset: -60,
                    legendPosition: 'middle',
                    format: (value: any) => `${Number(value).toLocaleString('zh-CN')}`
                  }}
                  tooltip={({ indexValue, value, color }) => (
                    <strong style={{ color }}>
                      {indexValue}: {Number(value).toLocaleString('zh-CN')}
                      {powerConsumptionUnit}
                    </strong>
                  )}
                  theme={{
                    tooltip: {
                      container: {
                        background: '#333'
                      }
                    }
                  }}
                  enableLabel={false}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} title="安装设备数" headStyle={{ height: 50 }} bodyStyle={{ height: 320, position: 'relative', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', zIndex: 99, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                  <span style={{ fontSize: 40 }}>{installedDeviceCount}</span>
                </div>
                <ResponsivePie data={getInstallDevice()} margin={{ top: 30, right: 10, bottom: 30, left: 10 }} innerRadius={0.55} padAngle={1} cornerRadius={5} colors={{ scheme: 'nivo' }} radialLabelsTextXOffset={5} radialLabelsLinkDiagonalLength={15} radialLabelsLinkHorizontalLength={20} radialLabelsLinkStrokeWidth={1} radialLabelsLinkColor={{ from: 'color' }} slicesLabelsTextColor="#333333" animate={true} />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} title="在线情况" headStyle={{ height: 50 }} bodyStyle={{ height: 130, textAlign: 'center', alignItems: 'center', fontSize: '32px' }}>
                <Row gutter={24}>
                  <Col span={8}>
                    <div style={{ borderBottom: '2px solid #61D5BE' }}>
                      <div style={{ color: '#61D5BE' }}>{onlineState.switchPanel}</div>
                      <div style={{ fontSize: '16px' }}>开关面板</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ borderBottom: '2px solid #FFD66A' }}>
                      <div style={{ color: '#FFD66A' }}>{onlineState.lighting}</div>
                      <div style={{ fontSize: '16px' }}>照明设备</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ borderBottom: '2px solid #FF6A94' }}>
                      <div style={{ color: '#FF6A94' }}>{onlineState.sensor}</div>
                      <div style={{ fontSize: '16px' }}>传感器</div>
                    </div>
                  </Col>
                </Row>
              </Card>
              <Card bordered={false} title="设备使用次数" headStyle={{ height: 50 }} bodyStyle={{ height: 130, textAlign: 'center', alignItems: 'center', fontSize: '32px' }}>
                <Row gutter={24}>
                  <Col span={12}>
                    <div style={{ borderBottom: '2px solid #61D5BE' }}>
                      <div style={{ color: '#61D5BE' }}>{deviceNumOfUse.switchPanel}</div>
                      <div style={{ fontSize: '16px' }}>开关面板</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ borderBottom: '2px solid #FFD66A' }}>
                      <div style={{ color: '#FFD66A' }}>{deviceNumOfUse.lighting}</div>
                      <div style={{ fontSize: '16px' }}>照明设备</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <Card title="各时段用电量统计" bordered={false} headStyle={{ height: 50 }} bodyStyle={{ height: 480 }}>
            <ResponsiveLine
              data={[getTimeIntervalPower(timeIntervalPower)]}
              margin={{ top: 40, right: 40, bottom: 40, left: 50 }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              curve="natural"
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: consumptionUnit,
                legendOffset: -40,
                legendPosition: 'middle'
              }}
              useMesh={true}
            />
          </Card>
        </Suspense>
      </GridContent>
    );
  }
}

export default connect(({ deviceboard, loading }: { deviceboard: DeviceboardModelState; loading: Loading }) => ({
  deviceboard,
  loading: loading.models.deviceboard
}))(Deviceboard);
