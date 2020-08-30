//@ts-nocheck

import { Button, Card, Col, Collapse, Divider, Form, Input, Modal, Popconfirm, Row, Select, Switch, Table, Tooltip, Tree, message, notification } from 'antd';
import { ConditionInfo, Conditions, Operation } from '@/interface';
import { DeleteOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import { FilterConnect, FilterOperator } from '@/enumerate';
import { IntlShape, useIntl, useModel } from 'umi';
import { LoadingObject, modalFormLayout, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';

import { AdditionalPickerLocaleLangProps } from 'antd/lib/date-picker/generatePicker';
import ButtonBar from '@/components/ButtonBar';
import ColumnTitle from '@/components/ColumnTitle';
import { Guid } from 'guid-typescript';
import { PageContainer } from '@ant-design/pro-layout';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import moment from 'moment';

export default (): React.ReactNode => {
  const intl: IntlShape = useIntl();
  const { itemList, loading, total, current, pageSize, getRoleTable, addRole, deleteRole, updateRole, getMenuTree } = useModel('system.role.roleList');
  const [menuTree, setMenuTreeForm] = useState<Array<MenuDto.MenuTreeOutDto>>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('role.modal.title.create');
  const [modalForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [itemId, setItemId] = useState<string>('');
  const [menucheckedKeys, setTreeCheckedKeys] = useState<any>([]);

  const [expandedKeys, setExpandedKeys] = useState<string[]>();
  const [checkedKeys1, setCheckedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [newCheckedKeys, setNewCheckedKeys] = useState<any>({ checked: [] });
  const [getSelectedRows, setSelectedRows] = useState<any[]>([]);
  useEffect(() => {
    getRoleTable({ pageIndex: 1, pageSize: 10 });
  }, []);
  const fun = () => {
    const clickarr = [
      { name: 'add', click1: onCreateClick },
      { name: 'update', click1: onEditClick },
      { name: 'delete', click1: onDeleteClick }
    ];
    const index = clickarr.findIndex((x: any) => x.name == butBarRef.current.itemclick);
    if (index >= 0) {
      let clickmodel = clickarr[index];
      clickmodel.click1();
    }
  };
  const add = () => {};
  //表格
  const columns: Array<ColumnProps<Types.RoleTable>> = [
    { title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.name' })} />, dataIndex: 'name', key: 'name', align: 'center' },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.isAdmin' })} />,
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      align: 'center',
      render: text => {
        return text === true ? '是' : '否';
      }
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.create.time' })} />,
      dataIndex: 'createdTime',
      key: 'createdTime',
      align: 'center',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.modify.time' })} />,
      dataIndex: 'lastModifierTime',
      key: 'lastModifierTime',
      align: 'center',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    { title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.description' })} />, dataIndex: 'description', key: 'description', align: 'center' }
    // {
    //   title: <ColumnTitle name={intl.formatMessage({ id: 'role.table.columns.operating' })} />,
    //   key: 'operation',
    //   align: 'center',
    //   render: (_: string, record: Types.RoleTable) => (
    //     <div>
    //       <Tooltip placement="bottom" title={intl.formatMessage({ id: 'role.table.columns.tooltip.delete' })}>
    //         <Popconfirm placement="top" title={intl.formatMessage({ id: 'role.table.columns.popconfirm.title' })} onConfirm={() => onDeleteClick(record.id!)} icon={<WarningOutlined />}>
    //           <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
    //         </Popconfirm>
    //       </Tooltip>
    //       <Divider type="vertical" />
    //       <Tooltip placement="bottom" title={intl.formatMessage({ id: 'role.table.columns.tooltip.modify' })}>
    //         <EditOutlined onClick={() => onEditClick(record)} />
    //       </Tooltip>
    //     </div>
    //   )
    // }
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
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows);
    }
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
  /**
   * 获取表格分页
   * @param current
   * @param pageSize
   * @param args
   */
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
  /**
   * 添加一个角色
   */
  const onCreateClick = () => {
    setModalModel('create');
    setModalTitle('role.modal.title.create');
    getMenuTree({
      callback: (result: any) => {
        const data = result.data;
        setMenuTreeForm(data);
        setTreeCheckedKeys([]);
        modalForm.setFieldsValue({
          name: '',
          isAdmin: false,
          description: ''
        });
        setItemId('');
        setModalShow(true);
      }
    });
  };

  /**
   * 修改一个角色
   */
  const onEditClick = () => {
    setModalModel('edit');
    setModalTitle('role.modal.title.modify');
    getTableSelected(getSelectedRows, (row: any) => {
      getMenuTree({
        payload: { roleId: row.id },
        callback: (result: any) => {
          const data = result.data;
          let selecteddata = result.selected;
          setMenuTreeForm(data);
          // --------------暂时有问题还未解决获取不到数据

          // setTreeCheckedKeys(selecteddata);

          // ReBuildTreeSelect(data, selecteddata);
          setTreeCheckedKeys(selecteddata);
          modalForm.setFieldsValue({
            name: row.name,
            description: row.description,
            isAdmin: row.isAdmin
          });
          setItemId(row.id);
          setModalShow(true);
        }
      });
    });
  };
  const ReBuildTreeSelect = (_tree: any, _selecteddata: any) => {
    let selechildrenarr = [];
    _tree.forEach(element => {
      if (element.children.length > 0) {
        element.children.forEach(x => {
          if (_selecteddata.indexOf(x.id) >= 0) {
            selechildrenarr.push(x.id);
          }
          if (selechildrenarr.length != element.children.length) {
            let removeindex = _selecteddata.indexOf(element.id);
            if (removeindex > -1) {
              _selecteddata.splice(removeindex, 1);
            }
          }
        });
      }
      ReBuildTreeSelect(element.children, _selecteddata);
    });
  };
  /**
   *
   * @param checkedKeys
   * @param e
   * , e: { checked: boolean; checkedNodes: any; node: any; event: any; halfCheckedKeys: any
   */
  const onCheck = (data: any, e: any) => {
    let checked: Array<string> = data.checked;
    if (e.checked) {
      for (let index = 0; index < checked.length; index++) {
        const element = checked[index];
        tree(menuTree, element);
      }
    } else {
      let i: number = checked.findIndex((x: string) => x === e.node.parentId);
      if (i >= 0) {
        checked.splice(i, 1);
        for (let index = 0; index < checked.length; index++) {
          const element = checked[index];
          tree(menuTree, element);
        }
      }
    }
    /**
     * 选中时的递归
     * @param treearr
     * @param id
     */
    function tree(treearr: any, id: any) {
      let arr = treearr;
      for (let index = 0; index < arr.length; index++) {
        let isexitsindex = arr[index].children.findIndex((x: any) => x.id === id);
        if (isexitsindex < 0) {
          let chil = arr[index].children;
          tree(chil, id);
        } else {
          if (checked.findIndex((x: string) => x === arr[index].id) < 0) checked.push(arr[index].id);
        }
      }
    }
    setTreeCheckedKeys(checked);
  };

  let CurrentItem: any = {};
  /**
   * 是否是父级节点
   * @param item menuTreeItem
   */
  const isParent = (item: any): boolean => {
    if (!!item.children && item.children.length > 0) return true;
    return false;
  };
  /**
   * 获取当前id的对象节点
   * @param items 查询的集合
   * @param id 查询的id
   */
  const getCurrentItem = (items: Array<any>, id: string): any => {
    for (let index = 0, item: any; (item = items[index++]); ) {
      if (item.id === id) {
        CurrentItem = item;
      } else {
        if (isParent(item)) {
          getCurrentItem(item.children, id);
        } else continue;
      }
    }
  };

  /**
   * 删除一个角色
   * @param id
   */
  const onDeleteClick = (id: string) => {
    deleteRole(id)
      .then(() => {
        message.success(intl.formatMessage({ id: 'role.function.delete.click.success' }));
        getRoleList(1, 10);
      })
      .catch((error: Error) => message.error(`${intl.formatMessage({ id: 'role.function.delete.click.fail' })}:${error}`));
  };
  /**
   * 点击弹框确定按钮保存
   */
  const onModalOK = () => {
    // menucheckedKeys.forEach(element => {
    //   getParentIds(element, menuTree);
    // });

    if (modalModel === 'create') {
      modalForm.validateFields().then((values: Store) => {
        const { name, isAdmin, description } = values;
        let args = {
          name: name,
          isAdmin: isAdmin,
          description: description,
          menuIds: menucheckedKeys
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
          description: description,
          menuIds: menucheckedKeys
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

  const getParentIds = (id: string, arr: any): Promise<any> => {
    arr.forEach(element => {
      const index = element.children.findIndex((x: any) => x.id == id);
      if (element.children.findIndex((x: any) => x.id == id).parentId == Guid.EMPTY) {
        menucheckedKeys.push(element.id);
        return;
      }
      if (index < 0) {
        getParentIds(id, element.children);
      } else {
        if (menucheckedKeys.indexOf(element.children[index].parentId) < 0) {
          menucheckedKeys.push(element.children[index].parentId);
          getParentIds(element.children[index].parentId, menuTree);
        }
      }
    });
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
  /**
   * 查询条件定义
   */
  const getSearchFormInfo = () => {
    const conditions: ConditionInfo[] = [new ConditionInfo('name', FilterOperator.LIKE), new ConditionInfo('isAdmin')];
    return conditions;
  };
  /**
   * 查询搜索框
   * @param values
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
  const handleSearch = (values: Store) => {
    let filter = getSearchFilter(values);
    getRoleList(1, 10, filter);
  };

  const onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };
  // const renderTreeNodes = (data: any) => {
  //   console.log(data)
  //   data.map(item => {
  //     if (item.children) {
  //       //判断是否已经全选；
  //       return (
  //         <Tree.TreeNode title='gfdgf' key={item.key}  >
  //           {renderTreeNodes(item.children)}
  //         </Tree.TreeNode>
  //       );
  //     }
  //     return <Tree.TreeNode {...item} />;
  //   });

  // }

  const butBarRef = useRef<any>(null);
  return (
    <PageContainer>
      <Card>
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
          rowKey={record => record?.id!}
          tableLayout="fixed"
          size="small"
          dataSource={itemList}
          pagination={pagination}
          columns={columns}
          onRow={record => {
            return {
              onClick: event => {
                console.log(record);
              }, // 点击行
              onDoubleClick: event => {},
              onContextMenu: event => {},
              onMouseEnter: event => {}, // 鼠标移入行
              onMouseLeave: event => {}
            };
          }}
        ></Table>
      </Card>

      <Modal
        maskClosable={false}
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
        </Form>
        <Card>
          <Tree checkable defaultExpandAll={true} onCheck={onCheck} checkedKeys={menucheckedKeys} treeData={menuTree} checkStrictly>
            {/* {console.log(menuTree)} */}
            {/* {renderTreeNodes(menuTree)} */}
          </Tree>
        </Card>
      </Modal>
    </PageContainer>
  );
};
