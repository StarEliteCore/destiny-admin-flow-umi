import { Button, Card, Col, Form, Input, Modal, Radio, Row, Switch, Table, Tooltip, Transfer, message, notification } from 'antd';
import { ConditionInfo, Conditions, Operation } from '@/interface';
import { FilterConnect, FilterOperator } from '@/enumerate';
import { LoadingObject, modalFormLayout, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl, useModel } from 'umi';

import ButtonBar from '@/components/ButtonBar';
import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';
import IconFont from '@/components/IconFont';
import { PageContainer } from '@ant-design/pro-layout';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import moment from 'moment';

export default (): React.ReactNode => {
  const intl = useIntl();
  const [searchForm] = Form.useForm();
  const [modalForm] = Form.useForm();

  const { itemList, loading, total, current, pageSize, getUserTable, addUser, editUser, deleteUser, getUserForm } = useModel('system.user.userList');
  const { roles, getRoles } = useModel('role');

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('user.modal.title.create');
  const [itemId, setItemId] = useState<string>('');
  const [getSelectedRows, setSelectedRows] = useState<any[]>([]);
  const [getTargetKeys, setTargetKeys] = useState<string[]>([]);
  const butBarRef = useRef<any>(null);
  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getUserTable({ pageIndex: 1, pageSize: 10 });
  }, []);

  const fun = () => {
    const clickarr = [
      { name: 'add', click1: onCreateClick },
      { name: 'update', click1: onEditClick },
      { name: 'delete', click1: onDeleteClick }
    ];

    const index = clickarr.findIndex((x: any) => x.name === butBarRef.current.itemclick);

    if (index >= 0) {
      let clickmodel = clickarr[index];
      clickmodel.click1();
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows);
    }
  };

  const columns: Array<ColumnProps<Types.UserTable>> = [
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'user.table.columns.username'
          })}
        />
      ),
      dataIndex: 'userName',
      key: 'userName',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'user.table.columns.nickname'
          })}
        />
      ),
      dataIndex: 'nickName',
      key: 'nickName',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'user.table.columns.create.time'
          })}
        />
      ),
      dataIndex: 'createdTime',
      key: 'createdTime',
      align: 'center',
      render: (text: string) => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : undefined)
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'user.table.columns.modify.time'
          })}
        />
      ),
      dataIndex: 'lastModifierTime',
      key: 'lastModifierTime',
      align: 'center',
      render: (text: string) => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : undefined)
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'user.table.columns.description'
          })}
        />
      ),
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    }
  ];
  /**
   *删除用户
   * @param id
   */
  const onDeleteClick = () => {
    getTableSelected(getSelectedRows, (row: any) => {
      deleteUser(row.id)
        .then(() => {
          message.success(intl.formatMessage({ id: 'user.function.delete.click.success' }));
          getUserList(1, 10);
        })
        .catch((error: Error) => message.error(`${intl.formatMessage({ id: 'user.function.delete.click.fail' })}:${error}`));
    });
  };
  /**
   *
   * @param record 修改用户
   */
  const onEditClick = () => {
    setModalModel('edit');
    setModalTitle('user.modal.title.modify');
    getTableSelected(getSelectedRows, (row: any) => {
      setItemId(row.id!);
      getUserForm({
        payload: { id: row.id },
        callback: (result: any) => {
          const data = result.data;
          modalForm.setFieldsValue({
            username: data?.userName,
            nickname: data?.nickName,
            sex: data?.sex,
            isSystem: data?.isSystem,
            roles: data?.roleIds,
            description: data?.description
          });
          setTargetKeys(data?.roleIds);
        }
      });
      setModalShow(true);
    });
  };
  const handleReset = () => {
    searchForm.resetFields();
    getUserList(1, 10);
  };
  /***
   * 获取选中的数据
   */
  const getTableSelected = (rows: any[], callback: any) => {
    if (rows.length == 0) {
      message.warning('请选择数据！！！');

      return;
    }
    if (rows.length > 1) {
      message.warning(`已选择${rows.length}行数据,请重选择！！！`);
      return;
    }

    let fun = function () {
      if (callback) {
        callback(rows[0]);
      }
    };

    fun();
  };
  const handleSearch = (values: Store) => {
    let filter = getSearchFilter(values);
    getUserList(1, 10, filter);
  };
  /**
   * 创建用户
   */
  const onCreateClick = () => {
    setModalModel('create');
    setModalTitle('user.modal.title.create');
    modalForm.setFieldsValue({
      username: '',
      nickname: '',
      sex: 0,
      isSystem: false,
      password: '',
      roles: [],
      description: ''
    });
    setTargetKeys([]);
    setItemId('');
    setModalShow(true);
  };

  const onModalOK = () => {
    if (modalModel === 'create') {
      modalForm.validateFields().then((values: Store) => {
        const { username, nickname, sex, isSystem, password, roles, description } = values;
        let passwordTemp = password ? { passwordHash: password } : {};
        // let rolesIds: string[] = [];
        // console.log(roles);
        // if (roles instanceof Array) {
        //   rolesIds = roles;
        // } else {
        //   rolesIds.push(roles);
        // }
        let args = {
          userName: username,
          nickName: nickname,
          // createdTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          isSystem: isSystem,
          description: description,
          sex: sex,
          roleIds: roles,
          ...passwordTemp
        };
        addUser(args)
          .then(() => {
            message.success(intl.formatMessage({ id: 'user.function.add.user.success' }));
            getUserList(1, 10);
          })
          .catch((error: Error) =>
            notification.error({
              message: intl.formatMessage({ id: 'user.function.add.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'user.function.add.user.fail.description' })} ${error}`
            })
          );
      });
    } else {
      modalForm.validateFields().then((values: Store) => {
        const { username, nickname, sex, isSystem, roles, description } = values;
        let rolesIds: string[] = [];
        if (roles instanceof Array) {
          rolesIds = roles;
        } else {
          rolesIds.push(roles);
        }
        let args = {
          userName: username,
          nickName: nickname,
          // createdTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          isSystem: isSystem,
          description: description,
          sex: sex,
          roleIds: getTargetKeys
        };
        editUser({ ...args, id: itemId })
          .then(() => {
            message.success(intl.formatMessage({ id: 'user.function.modify.user.success' }));
            getUserList(1, 10);
          })
          .catch((error: Error) =>
            notification.error({
              message: intl.formatMessage({ id: 'user.function.modify.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'user.function.modify.user.fail.description' })} ${error}`
            })
          );
      });
    }
    setModalShow(false);
  };

  /**
   * 查询条件拼接
   */
  const getSearchFilter = (values: any) => {
    const conditions = getSearchFormInfo();
    let newConditions: Conditions[] = [];
    for (let key in values) {
      if (values[key] === '' || values[key] === undefined) {
        continue;
      }
      const condition = conditions.filter((o: ConditionInfo) => o.field.toLowerCase() == key.toLowerCase())[0];
      const operator = condition == undefined ? FilterOperator.LIKE : condition.operator;
      let item: Conditions = {
        field: key,
        value: operator == FilterOperator.LIKE ? `%${values[key]}%` : values[key],
        operator: operator
      };
      newConditions.push(item);
    }
    return newConditions;
  };
  /**
   * 查询条件定义
   */
  const getSearchFormInfo = () => {
    const conditions: ConditionInfo[] = [new ConditionInfo('UserName', FilterOperator.LIKE), new ConditionInfo('nickname', FilterOperator.LIKE)];
    return conditions;
  };
  const getUserList = (current: number, pageSize: number, args: any = {}) => {
    let operationProps: Operation = {
      pageIndex: current,
      pageSize: pageSize
    };
    if (args.length > 0) {
      operationProps.filter = {
        filterConnect: FilterConnect.AND,
        conditions: args
      };
    }
    getUserTable(operationProps).catch((error: Error) => {
      notification.error({
        message: intl.formatMessage({ id: 'user.function.get.user.list.fail.message' }),
        description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
      });
    });
  };

  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total,
    current,
    pageSize,
    onShowSizeChange: (current: number, pageSize: number) => {
      let args = searchForm.getFieldsValue();
      let filter = getSearchFilter(args);
      getUserList(current, pageSize, filter);
    },
    onChange: (page: number, pageSize?: number) => {
      let args = searchForm.getFieldsValue();
      let filter = getSearchFilter(args);
      getUserList(page, pageSize ?? 10, filter);
    }
  };

  const handleScroll = () => {};

  const handleChange = (nextTargetKeys: any) => {
    setTargetKeys(nextTargetKeys);
  };
  return (
    <PageContainer>
      <Card>
        <Form onFinish={handleSearch} form={searchForm}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="UserName" label={intl.formatMessage({ id: 'user.form.item.username' })} style={{ marginBottom: 0 }}>
                <Input allowClear placeholder={intl.formatMessage({ id: 'user.input.placeholder' })} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="NickName" label={intl.formatMessage({ id: 'user.form.item.nickname' })} style={{ marginBottom: 0 }}>
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
      </Card>
      <Card>
        <ButtonBar getFun={fun} ref={butBarRef}></ButtonBar>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          loading={LoadingObject(loading)}
          rowKey={(record: Types.UserTable) => record?.id!}
          tableLayout="fixed"
          size="small"
          dataSource={itemList}
          pagination={pagination}
          columns={columns}
        />
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
        onCancel={() => {
          modalForm.resetFields();
          setModalShow(false);
        }}
        onOk={onModalOK}
      >
        <Form {...modalFormLayout} form={modalForm}>
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
              <Radio value={0}>
                <Tooltip placement="bottom" title={intl.formatMessage({ id: 'user.modal.form.item.sex.man' })}>
                  <IconFont type="icon-man" />
                </Tooltip>
              </Radio>
              <Radio value={1}>
                <Tooltip placement="bottom" title={intl.formatMessage({ id: 'user.modal.form.item.sex.woman' })}>
                  <IconFont type="icon-woman" />
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isSystem" label={intl.formatMessage({ id: 'user.modal.form.item.is.system' })} valuePropName="checked">
            <Switch checkedChildren={intl.formatMessage({ id: 'user.modal.form.item.is.system.check' })} unCheckedChildren={intl.formatMessage({ id: 'user.modal.form.item.is.system.un.check' })} />
          </Form.Item>
          {itemId == '' && (
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
          )}

          <Form.Item name="roles" label={intl.formatMessage({ id: 'user.modal.form.item.roles.label' })}>
            {/* <Select loading={roleLoading} placeholder={intl.formatMessage({ id: 'user.modal.form.item.roles.select.placeholder' })}>
              {roles?.map((item: Types.Role) => (
                <Select.Option key={item.value} value={item.value!}>
                  {item.text}
                </Select.Option>
              ))}
            </Select> */}
            <Transfer
              rowKey={record => record.value}
              render={item => item.text}
              onScroll={handleScroll}
              onChange={handleChange}
              targetKeys={getTargetKeys}
              dataSource={roles}
              titles={['源', '目标']}
              oneWay
            />
          </Form.Item>
          <Form.Item name="description" label={intl.formatMessage({ id: 'user.modal.form.item.description.label' })} style={{ marginBottom: 0 }}>
            <Input.TextArea allowClear placeholder={intl.formatMessage({ id: 'user.modal.form.item.description.placeholder' })} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
