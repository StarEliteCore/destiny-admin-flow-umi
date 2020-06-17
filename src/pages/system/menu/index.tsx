import { Button, Card, Col, Collapse, Divider, Form, Input, Modal, Popconfirm, Radio, Row, Select, Switch, Table, Tooltip, message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import { IntlShape, useIntl, useModel } from 'umi';
import { LoadingObject, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import moment from 'moment';
import { useForm } from 'antd/lib/form/util';

const Menu: React.FC<{}> = () => {
  const intl: IntlShape = useIntl();
  const [searchForm] = useForm();
  const [modalForm] = useForm();

  const { itemList, loading, total, current, getMenuTable } = useModel('useMenuModel');
  const { loading: roleLoading } = useModel('useMenuModel');

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('user.modal.title.create');
  const [itemId, setItemId] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(1);

  useEffect(() => {
    getMenuTable({ pageIndex: 1, pageSize: 10 });
  }, []);

  const columns: Array<ColumnProps<Types.UserTable>> = [
    { title: <ColumnTitle name="菜单名" />, dataIndex: 'name', key: 'name', align: 'center' },
    { title: <ColumnTitle name="路由" />, dataIndex: 'path', key: 'path', align: 'center' },
    { title: <ColumnTitle name="说明" />, dataIndex: 'description', key: 'description', align: 'center' },
    { title: <ColumnTitle name="图标" />, dataIndex: 'icon', key: 'icon', align: 'center' },
    { title: <ColumnTitle name="排序" />, dataIndex: 'sort', key: 'sort', align: 'center' },
    { title: <ColumnTitle name="组件路径" />, dataIndex: 'component', key: 'component', align: 'center' },
    { title: <ColumnTitle name="深度" />, dataIndex: 'depth', key: 'depth', align: 'center' },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'user.table.columns.operating' })} />,
      key: 'action',
      align: 'center',
      render: (_: string, record: Types.UserTable) => (
        <div>
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'user.table.columns.tooltip.delete' })}>
            <Popconfirm placement="top" title={intl.formatMessage({ id: 'user.table.columns.popconfirm.title' })} onConfirm={() => onDeleteClick(record.id!)} icon={<WarningOutlined />}>
              <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
            </Popconfirm>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'user.table.columns.tooltip.modify' })}>
            <EditOutlined onClick={() => onEditClick(record)} />
          </Tooltip>
        </div>
      )
    }
  ];

  const onDeleteClick = (id: string) => {};

  const onEditClick = (record: Types.UserTable) => {
    setModalModel('edit');
    setModalTitle('user.modal.title.modify');
    setItemId(record.id!);
    modalForm.setFieldsValue({
      username: record.userName,
      nickname: record.nickName,
      sex: record.sex,
      isSystem: record.isSystem,
      password: '',
      roles: '',
      description: record.description
    });
    setModalShow(true);
  };

  const handleReset = () => {
    searchForm.resetFields();
    handleSearch({});
  };

  const handleSearch = (values: Store) => {};

  const onCreateClick = () => {
    setModalModel('create');
    setModalTitle('user.modal.title.create');
    modalForm.setFieldsValue({
      username: '',
      nickname: '',
      sex: 0,
      isSystem: false,
      password: '',
      roles: '',
      description: ''
    });
    setItemId('');
    setModalShow(true);
  };

  const onModalOK = () => {
    if (modalModel === 'create') {
      modalForm.validateFields().then((values: Store) => {
        const { username, nickname, sex, isSystem, password, roles, description } = values;
        let passwordTemp = password ? { passwordHash: password } : {};
        let args = {
          userName: username,
          nickName: nickname,
          createdTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          isSystem: isSystem,
          description: description,
          sex: sex,
          roleIds: [roles],
          ...passwordTemp
        };
      });
    } else {
      modalForm.validateFields().then((values: Store) => {
        const { username, nickname, sex, isSystem, password, roles, description } = values;
        let passwordTemp = password ? { passwordHash: password } : {};
        let args = {
          userName: username,
          nickName: nickname,
          createdTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          isSystem: isSystem,
          description: description,
          sex: sex,
          roleIds: [roles],
          ...passwordTemp
        };
      });
    }
    setModalShow(false);
  };

  const getUserList = (current: number, pageSize: number) => {
    setPageIndex(current);
    getMenuTable({ pageIndex: current, pageSize }).catch((error) => {
      notification.error({
        message: intl.formatMessage({ id: 'user.function.get.user.list.fail.message' }),
        description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
      });
    });
  };

  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total: total,
    current: pageIndex,
    onShowSizeChange: (current: number, pageSize: number) => getUserList(current, pageSize),
    onChange: (page: number, pageSize?: number) => getUserList(page, pageSize ?? 10)
  };

  return (
    <div className="global-container">
      <Card>
        <Collapse accordion>
          <Collapse.Panel header={intl.formatMessage({ id: 'user.collapse.panel_1.header' })} key="1">
            <Form onFinish={handleSearch} form={searchForm}>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name="username" label={intl.formatMessage({ id: 'user.form.item.username' })} style={{ marginBottom: 0 }}>
                    <Input allowClear placeholder={intl.formatMessage({ id: 'user.input.placeholder' })} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="nickname" label={intl.formatMessage({ id: 'user.form.item.nickname' })} style={{ marginBottom: 0 }}>
                    <Input allowClear placeholder={intl.formatMessage({ id: 'user.input.placeholder' })} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <span style={{ float: 'right' }}>
                    <Button type="primary" htmlType="submit">
                      {intl.formatMessage({ id: 'user.button.submit' })}
                    </Button>
                    <Button style={{ marginLeft: 14 }} onClick={handleReset}>
                      {intl.formatMessage({ id: 'user.button.reset' })}
                    </Button>
                  </span>
                </Col>
              </Row>
            </Form>
          </Collapse.Panel>
        </Collapse>
      </Card>
      <Card>
        <Button type="primary" style={{ marginBottom: 15 }} onClick={onCreateClick}>
          {intl.formatMessage({ id: 'user.button.create' })}
        </Button>
        <Table loading={LoadingObject(loading)} rowKey={(record) => record?.id!} tableLayout="fixed" size="small" dataSource={itemList} pagination={pagination} columns={columns}></Table>
      </Card>
    </div>
  );
};

export default Menu;
