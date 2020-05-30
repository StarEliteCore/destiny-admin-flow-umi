import { Button, Card, Col, Collapse, Divider, Form, Input, Modal, Popconfirm, Radio, Row, Select, Switch, Table, Tooltip, message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import { IntlShape, useIntl, useModel } from 'umi';
import { LoadingObject, modalFormLayout, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import dayjs from 'dayjs';
import { useForm } from 'antd/lib/form/util';

const User: React.FC<{}> = () => {
  const intl: IntlShape = useIntl();
  const [searchForm] = useForm();
  const [modalForm] = useForm();

  const { itemList, loading, total, getUserTable, addUser, editUser, deleteUser } = useModel('useUserTableModel');

  const { loading: roleLoading, roles, getRoles } = useModel('useRoleModel');

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('user.modal.title.create');
  const [itemData, setItemData] = useState<Types.UserEntry>({});
  const [pageIndex, setPageIndex] = useState<number>(1);

  useEffect(() => {
    getRoles();
    getUserTable({ pageIndex: 1, pageSize: 10 });
  }, []);

  const columns: Array<ColumnProps<Types.UserTable>> = [
    { title: <ColumnTitle name={intl.formatMessage({ id: 'user.table.columns.username' })} />, dataIndex: 'userName', key: 'userName', align: 'center' },
    { title: <ColumnTitle name={intl.formatMessage({ id: 'user.table.columns.nickname' })} />, dataIndex: 'nickName', key: 'nickName', align: 'center' },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'user.table.columns.create.time' })} />,
      dataIndex: 'createdTime',
      key: 'createdTime',
      align: 'center',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'user.table.columns.modify.time' })} />,
      dataIndex: 'lastModifierTime',
      key: 'lastModifierTime',
      align: 'center',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    { title: <ColumnTitle name={intl.formatMessage({ id: 'user.table.columns.description' })} />, dataIndex: 'description', key: 'description', align: 'center' },
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

  const onDeleteClick = (id: string) => {
    deleteUser(id)
      .then(() => {
        message.success(intl.formatMessage({ id: 'user.function.delete.click.success' }));
        getUserList(1, 10);
      })
      .catch(() => message.error(intl.formatMessage({ id: 'user.function.delete.click.fail' })));
  };

  const onEditClick = (record: Types.UserTable) => {
    setModalModel('edit');
    setModalTitle('user.modal.title.modify');
    setItemData({
      userName: record.userName,
      nickName: record.nickName,
      sex: record.sex,
      isSystem: record.isSystem,
      passwordHash: '',
      roleIds: [],
      description: record.description,
      id: record.id
    });
    setModalShow(true);
  };

  const handleReset = () => {
    searchForm.resetFields();
    handleSearch({});
  };

  const handleSearch = (values: Store) => {
    console.log(values);
  };

  const onCreateClick = () => {
    setModalModel('create');
    setModalTitle('user.modal.title.create');
    setItemData({
      userName: '',
      nickName: '',
      sex: 0,
      isSystem: false,
      passwordHash: '',
      roleIds: [''],
      description: ''
    });
    setModalShow(true);
  };

  const onModalOK = () => {
    if (modalModel === 'create') {
      modalForm.validateFields().then((values: Store) => {
        console.log(values);
        addUser(values)
          .then(() => {
            message.success(intl.formatMessage({ id: 'user.function.add.user.success' }));
            getUserList(1, 10);
          })
          .catch((error) =>
            notification.error({
              message: intl.formatMessage({ id: 'user.function.add.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'user.function.add.user.fail.description' })} ${error}`
            })
          );
      });
    } else {
      modalForm.validateFields().then((values: Store) => {
        console.log(values);
        editUser({ ...values, id: itemData.id })
          .then(() => {
            message.success(intl.formatMessage({ id: 'user.function.modify.user.success' }));
          })
          .catch((error) =>
            notification.error({
              message: intl.formatMessage({ id: 'user.function.modify.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'user.function.modify.user.fail.description' })} ${error}`
            })
          );
      });
    }
  };

  const getUserList = (current: number, pageSize: number) => {
    setPageIndex(current);
    getUserTable({ pageIndex: current, pageSize }).catch((error) => {
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
      <Modal
        visible={modalShow}
        title={intl.formatMessage({ id: modalTitle })}
        cancelText={intl.formatMessage({
          id: 'user.modal.cancel.text'
        })}
        okText={intl.formatMessage({
          id: 'user.modal.ok.text'
        })}
        destroyOnClose
        centered
        width={550}
        onCancel={() => setModalShow(false)}
        onOk={onModalOK}
      >
        <Form
          {...modalFormLayout}
          initialValues={{
            username: itemData.userName,
            nickname: itemData.nickName,
            sex: itemData.sex,
            isSystem: itemData.isSystem,
            password: itemData.passwordHash,
            roles: itemData.roleIds ? itemData.roleIds[0] : '',
            description: itemData.description
          }}
          form={modalForm}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'user.modal.form.item.username.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'user.modal.form.item.username.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'user.modal.form.item.username.input.placeholder' })} />
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'user.modal.form.item.nickname.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'user.modal.form.item.nickname.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'user.modal.form.item.nickname.input.placeholder' })} />
          </Form.Item>
          <Form.Item name="sex" label={intl.formatMessage({ id: 'user.modal.form.item.sex.label' })}>
            <Radio.Group>
              <Radio value={0}>{intl.formatMessage({ id: 'user.modal.form.item.sex.man' })}</Radio>
              <Radio value={1}>{intl.formatMessage({ id: 'user.modal.form.item.sex.woman' })}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isSystem" label={intl.formatMessage({ id: 'user.modal.form.item.is.system' })} valuePropName="checked">
            <Switch checkedChildren={intl.formatMessage({ id: 'user.modal.form.item.is.system.check' })} unCheckedChildren={intl.formatMessage({ id: 'user.modal.form.item.is.system.un.check' })} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'user.modal.form.item.password.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'user.modal.form.item.password.label' })}
          >
            <Input.Password allowClear placeholder={intl.formatMessage({ id: 'user.modal.form.item.password.input.placeholder' })} />
          </Form.Item>
          <Form.Item name="roles" label={intl.formatMessage({ id: 'user.modal.form.item.roles.label' })}>
            <Select loading={roleLoading} placeholder={intl.formatMessage({ id: 'user.modal.form.item.roles.select.placeholder' })}>
              {roles?.map((item: Types.Role) => (
                <Select.Option key={item.value} value={item.value!}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label={intl.formatMessage({ id: 'user.modal.form.item.description.label' })} style={{ marginBottom: 0 }}>
            <Input.TextArea allowClear placeholder={intl.formatMessage({ id: 'user.modal.form.item.description.placeholder' })} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
