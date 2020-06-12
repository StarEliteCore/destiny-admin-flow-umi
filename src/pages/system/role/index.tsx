import { Button, Card, Col, Collapse, Divider, Form, Input, Modal, Popconfirm, Row, Select, Switch, Tooltip, Tree, message, notification } from 'antd';
import { ConditionInfo, Conditions, Operation } from '@/interface';
import { DeleteOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import { FilterConnect, FilterOperator } from '@/enumerate';
import { IntlShape, useIntl, useModel } from 'umi';
import { LoadingObject, modalFormLayout, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import Table, { ColumnProps } from 'antd/lib/table';

import ColumnTitle from '@/components/ColumnTitle';
import { PageContainer } from '@ant-design/pro-layout';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import dayjs from 'dayjs';
import { useForm } from 'antd/lib/form/util';

export default (): React.ReactNode => {
  const intl: IntlShape = useIntl();
  const { itemList, loading, total, current, pageSize, getRoleTable, addRole, deleteRole, updateRole, getTreeSelectMenu, treeMenu, menuList } = useModel('roleList');

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('role.modal.title.create');
  const [modalForm] = useForm();
  const [searchForm] = useForm();
  const [itemId, setItemId] = useState<string>('');

  const [expandedKeys, setExpandedKeys] = useState<string[]>();
  const [checkedKeys1, setCheckedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [newCheckedKeys, setNewCheckedKeys] = useState<any>({ checked: [] });
  useEffect(() => {
    //getTreeList();
  }, []);
  useEffect(() => {
    getRoleTable({ pageIndex: 1, pageSize: 10 });
  }, []);

  const getTreeList = () => {
    getTreeSelectMenu();
  };
  //表格
  const columns: Array<ColumnProps<Types.RoleTable>> = [
    { title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.name' })} />, dataIndex: 'name', key: 'name', align: 'center' },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.isAdmin' })} />,
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      align: 'center',
      render: (text) => {
        return text === true ? '是' : '否';
      }
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.create.time' })} />,
      dataIndex: 'createdTime',
      key: 'createdTime',
      align: 'center',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.modify.time' })} />,
      dataIndex: 'lastModifierTime',
      key: 'lastModifierTime',
      align: 'center',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    { title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.description' })} />, dataIndex: 'description', key: 'description', align: 'center' },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.operating' })} />,
      key: 'operation',
      align: 'center',
      render: (_: string, record: Types.RoleTable) => (
        <div>
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'role.table.columns.tooltip.delete' })}>
            <Popconfirm placement="top" title={intl.formatMessage({ id: 'role.table.columns.popconfirm.title' })} onConfirm={() => onDeleteClick(record.id!)} icon={<WarningOutlined />}>
              <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
            </Popconfirm>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'role.table.columns.tooltip.modify' })}>
            <EditOutlined onClick={() => onEditClick(record)} />
          </Tooltip>
        </div>
      )
    }
  ];

  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total,
    current,
    pageSize,
    onShowSizeChange: (current: number, pageSize: number) => {
      let args = searchForm.getFieldsValue();
      let filter = getSearchFilter(args);
      getRoleList(current, pageSize, filter);
    },
    onChange: (page: number, pageSize?: number) => {
      let args = searchForm.getFieldsValue();
      let filter = getSearchFilter(args);
      getRoleList(page, pageSize ?? 10, filter);
    }
  };

  const getRoleList = (current: number, pageSize: number, args: Conditions[] = []) => {
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
    getRoleTable(operationProps).catch((error: Error) => {
      notification.error({
        message: intl.formatMessage({ id: 'role.function.get.role.list.fail.message' }),
        description: `${intl.formatMessage({ id: 'role.function.get.role.list.fail.description' })} ${error}`
      });
    });
  };

  const onCreateClick = () => {
    setModalModel('create');
    setModalTitle('role.modal.title.create');
    modalForm.setFieldsValue({
      name: '',
      isAdmin: false,
      description: ''
    });
    setItemId('');
    setModalShow(true);
  };

  const onEditClick = (record: Types.RoleTable) => {
    setModalModel('edit');
    setModalTitle('role.modal.title.modify');
    setItemId(record.id!);
    modalForm.setFieldsValue({
      name: record.name,
      description: record.description,
      isAdmin: record.isAdmin
    });
    setModalShow(true);
  };

  const onDeleteClick = (id: string) => {
    deleteRole(id)
      .then(() => {
        message.success(intl.formatMessage({ id: 'role.function.delete.click.success' }));
        getRoleList(1, 10);
      })
      .catch((error: Error) => message.error(`${intl.formatMessage({ id: 'role.function.delete.click.fail' })}:${error}`));
  };

  const onModalOK = () => {
    if (modalModel === 'create') {
      modalForm.validateFields().then((values: Store) => {
        const { name, isAdmin, description } = values;
        let args = {
          name: name,
          isAdmin: isAdmin,
          description: description
        };

        addRole(args)
          .then(() => {
            message.success(intl.formatMessage({ id: 'role.function.add.role.success' }));
            getRoleList(1, 10);
            setModalShow(false);
          })
          .catch((error: Error) => {
            notification.error({
              message: intl.formatMessage({ id: 'role.function.add.role.fail.message' }),
              description: `${intl.formatMessage({ id: 'role.function.add.role.fail.description' })} ${error}`
            });
          });
      });
    } else {
      modalForm.validateFields().then((values: Store) => {
        const { name, isAdmin, description } = values;
        let args = {
          name: name,
          isAdmin: isAdmin,
          description: description
        };

        updateRole({ ...args, id: itemId })
          .then(() => {
            message.success(intl.formatMessage({ id: 'role.function.modify.role.success' }));
            getRoleList(1, 10);
            setModalShow(false);
          })
          .catch((error: Error) => {
            notification.error({
              message: intl.formatMessage({ id: 'role.function.modify.role.fail.message' }),
              description: `${intl.formatMessage({ id: 'role.function.modify.role.fail.description' })} ${error}`
            });
          });
      });
    }
  };

  const getParentIds = (id: string, allNodes: any): any => {
    let parents = [];
    let theNode = findTheNode(id, allNodes);
    if (theNode?.parentId && theNode?.parentId !== '00000000-0000-0000-0000-000000000000') {
      parents.push(theNode.parentId);
      parents.push(...getParentIds(theNode.parentId, allNodes));
    }

    return parents;
  };

  const getChildrenIds = (id: string, allNodes: any) => {
    var childrenIds = [];
    let children = allNodes.filter((item: any) => item.parentId == id).map((item: any) => item.id);
    if (children.length > 0) {
      childrenIds.push(...children);
      children.forEach((item: any) => {
        childrenIds.push(...getChildrenIds(item, allNodes));
      });
    }
    return childrenIds;
  };
  const findTheNode = (id: string, allNodes: any) => {
    return allNodes.filter((item: any) => item.id == id)[0];
  };

  const onCheck = (checkedKeys: any, e: any) => {
    let newChecked: any = [];

    let value = e.node.key;
    let treeData = menuList;
    debugger;
    if (e.checked) {
      let parentIds = getParentIds(value, treeData);
      if (!parentIds.includes(value)) {
        parentIds.push(value);
      }
      let children = getChildrenIds(value, treeData);
      let addNodes: any = parentIds.concat(children).filter((item: string) => !checkedKeys1.includes(item));
      newChecked = checkedKeys1.concat(addNodes);
    } else {
      //取消勾选事件,取消勾选所有子节点
      let children = getChildrenIds(value, treeData);
      children.push(value);
      newChecked = checkedKeys1.filter((item: string) => !children.includes(item));
    }
    setCheckedKeys(newChecked);
  };

  const onExpand = (expandedKeys: any) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    // setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  const getSearchFormInfo = () => {
    const conditions: ConditionInfo[] = [new ConditionInfo('name', FilterOperator.LIKE), new ConditionInfo('isAdmin')];

    return conditions;
  };

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
  const handleSearch = (values: Store) => {
    let filter = getSearchFilter(values);
    getRoleList(1, 10, filter);
  };

  return (
    <PageContainer>
      <Card>
        <Collapse accordion>
          <Collapse.Panel header={intl.formatMessage({ id: 'role.collapse.panel_1.header' })} key="1">
            <Form onFinish={handleSearch} form={searchForm}>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name="name" label={intl.formatMessage({ id: 'role.form.item.name' })} style={{ marginBottom: 0 }}>
                    <Input allowClear placeholder={intl.formatMessage({ id: 'role.input.placeholder' })} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="isAdmin" label={intl.formatMessage({ id: 'role.form.item.is.admin' })} style={{ marginBottom: 0 }}>
                    <Select allowClear placeholder={intl.formatMessage({ id: 'role.select.placeholder' })}>
                      <Select.Option value="true">是</Select.Option>
                      <Select.Option value="false">否</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <span style={{ float: 'right' }}>
                    <Button type="primary" htmlType="submit">
                      {intl.formatMessage({ id: 'role.button.submit' })}
                    </Button>
                    {/* <Button style={{ marginLeft: 14 }} onClick={handleReset}>
                      {intl.formatMessage({ id: 'user.button.reset' })}
                    </Button> */}
                  </span>
                </Col>
              </Row>
            </Form>
          </Collapse.Panel>
        </Collapse>
      </Card>

      <Card>
        <Button type="primary" style={{ marginBottom: 15 }} onClick={onCreateClick}>
          {intl.formatMessage({ id: 'role.button.create' })}
        </Button>
        <Table loading={LoadingObject(loading)} rowKey={(record) => record?.id!} tableLayout="fixed" size="small" dataSource={itemList} pagination={pagination} columns={columns}></Table>
      </Card>

      <Modal
        visible={modalShow}
        title={intl.formatMessage({ id: modalTitle })}
        cancelText={intl.formatMessage({
          id: 'role.modal.cancel.text'
        })}
        okText={intl.formatMessage({
          id: 'role.modal.ok.text'
        })}
        destroyOnClose
        centered
        width={550}
        onCancel={() => setModalShow(false)}
        onOk={onModalOK}
      >
        <Form {...modalFormLayout} form={modalForm}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'role.modal.form.item.name.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'role.modal.form.item.name.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'role.modal.form.item.name.input.placeholder' })} />
          </Form.Item>

          <Form.Item name="isAdmin" label={intl.formatMessage({ id: 'role.modal.form.item.is.admin' })} valuePropName="checked">
            <Switch checkedChildren={intl.formatMessage({ id: 'role.modal.form.item.is.admin.check' })} unCheckedChildren={intl.formatMessage({ id: 'role.modal.form.item.is.admin.un.check' })} />
          </Form.Item>
          <Form.Item name="description" label={intl.formatMessage({ id: 'role.modal.form.item.description.label' })} style={{ marginBottom: 0 }}>
            <Input.TextArea allowClear placeholder={intl.formatMessage({ id: 'role.modal.form.item.description.placeholder' })} />
          </Form.Item>
          {/* <Form.Item name="description" label={intl.formatMessage({ id: 'role.modal.form.item.description.label' })} style={{ marginBottom: 0 }}>
            <Tree checkable defaultExpandAll={true} autoExpandParent={autoExpandParent} onCheck={onCheck} checkedKeys={checkedKeys1} selectedKeys={selectedKeys} treeData={treeMenu} checkStrictly={true} />
          </Form.Item> */}
        </Form>
      </Modal>
    </PageContainer>
  );
};
