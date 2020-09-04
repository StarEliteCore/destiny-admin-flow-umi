import { Card, Drawer, Form, Input, InputNumber, Modal, Select, Table, Tag, message, notification } from 'antd';
import { LoadingObject, modalFormLayout } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl, useModel } from 'umi';

import ButtonBar from '@/components/ButtonBar';
import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';
import { Guid } from 'guid-typescript';
import { MenuDto } from '@/typings/menudto';
import { MenuTypeEnum } from '@/pages/system/menu/models/MenuTypeEnum';
import { PageContainer } from '@ant-design/pro-layout';
import { Store } from 'antd/lib/form/interface';

export default (): React.ReactNode => {
  const intl = useIntl();
  const [] = Form.useForm();
  const [modalForm] = Form.useForm();

  const { itemList, loading, getMenuTable, addMenu, editMenu, getLoadMenu, getMenuFunctionTable, menuFunctionItemList, menuFunctionLoading } = useModel('system.menu.menuServices');
  const { functions, getFunctions } = useModel('function');
  const [menuRow, setMenuRow] = useState<MenuDto.MenuTable>();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('user.modal.title.create');
  const [itemId, setItemId] = useState<string>('');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [menuType] = useState<Array<MenuDto.MenuType>>([
    { key: MenuTypeEnum.Menu, value: '菜单' },
    { key: MenuTypeEnum.Button, value: '按钮' }
  ]);
  const [getSelectedRows, setSelectedRows] = useState<any[]>([]);
  useEffect(() => {
    getMenuList();
  }, []);
  useEffect(() => {
    getFunctions();
  }, []);
  const butBarRef = useRef<any>(null);
  /**
   * 通用事件
   */
  const fun = () => {
    const clickarr = [
      { name: 'add', click1: onCreateClick },
      { name: 'update', click1: onEditClick },
      { name: 'delete', click1: onDeleteClick },
      { name: 'addchildren', click1: onCreateChildrenClick },
      { name: 'select', click1: onViewClick }
    ];
    const index = clickarr.findIndex((x: any) => x.name == butBarRef.current.itemclick);
    if (index >= 0) {
      let clickmodel = clickarr[index];
      clickmodel.click1();
    }
  };
  const columns: Array<ColumnProps<MenuDto.MenuTable>> = [
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.name'
          })}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.path'
          })}
        />
      ),
      dataIndex: 'path',
      key: 'path',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.description'
          })}
        />
      ),
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.icon'
          })}
        />
      ),
      dataIndex: 'icon',
      key: 'icon',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.sort'
          })}
        />
      ),
      dataIndex: 'sort',
      key: 'sort',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.component'
          })}
        />
      ),
      dataIndex: 'component',
      key: 'component',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'menu.table.columns.depth'
          })}
        />
      ),
      dataIndex: 'depth',
      key: 'depth',
      align: 'center'
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'menu.table.columns.type' })} />,
      key: 'action',
      align: 'center',
      render: (_: string, record: MenuDto.MenuTable) => {
        return record.type == MenuTypeEnum.Menu ? <Tag color="cyan">菜单</Tag> : <Tag color="blue">按钮</Tag>;
      }
    }
    // ,
    // {
    //   title: <ColumnTitle name={intl.formatMessage({ id: 'menu.table.columns.operating' })} />,
    //   key: 'action',
    //   align: 'center',
    //   render: (_: string, record: MenuDto.MenuTable) => (
    //     <div>
    //       <Tooltip placement="bottom" title="查看菜单功能">
    //         <SecurityScanFilled onClick={() => onViewClick(record.id)} />
    //       </Tooltip>
    //       <Divider type="vertical" />
    //       <Tooltip placement="bottom" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.add' })}>
    //         <FileAddFilled onClick={() => onCreateChildrenClick(record)} />
    //       </Tooltip>
    //       <Divider type="vertical" />
    //       {/* <Tooltip placement="bottom" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.modify' })}>
    //         <EditOutlined onClick={() => onEditClick(record)} />
    //       </Tooltip> */}
    //       <Divider type="vertical" />
    //       <Tooltip placement="bottom" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.delete' })}>
    //         <Popconfirm placement="top" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.title' })} onConfirm={() => onDeleteClick(record.id!)} icon={<WarningOutlined />}>
    //           <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
    //         </Popconfirm>
    //       </Tooltip>
    //     </div>
    //   )
    // }
  ];
  const menuFunctionColumns: Array<ColumnProps<MenuDto.MenuFunctionTable>> = [
    {
      title: <ColumnTitle name="功能名称" />,
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: <ColumnTitle name="链接" />,
      dataIndex: 'linkUrl',
      key: 'linkUrl',
      align: 'center'
    },
    {
      title: <ColumnTitle name="描述" />,
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    }
  ];
  /**
   * 表格选择框事件
   */
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
   * 删除菜单或按钮
   * @param id
   */
  const onDeleteClick = () => {
    // delMenu(id)
    //   .then(() => {
    //     message.success(intl.formatMessage({ id: 'user.function.delete.click.success' }));
    //     getMenuList();
    //   })
    //   .catch((error: Error) => message.error(`${intl.formatMessage({ id: 'user.function.delete.click.fail' })}:${error}`));
  };
  /**
   * 获取菜单功能
   * @param id
   */
  const onViewClick = () => {
    getTableSelected(getSelectedRows, (row: any) => {
      getMenuFunctionList(row.id);
      setShowDrawer(true);
    });
  };
  /**
   * 关闭抽屉
   */
  const onCloseDrawer = () => {
    setShowDrawer(false);
  };

  const [loadmenudata, setLoadMenuData] = useState<{ parentId?: string; parentNumber?: string; depth?: number }>({});
  /**
   * 修改菜单或按钮
   * @param record
   */
  const onEditClick = () => {
    setModalModel('edit');
    setModalTitle('modal.title.modify');

    getTableSelected(getSelectedRows, (row: any) => {
      getLoadMenu({
        payload: { id: row.id },
        callback: (result: any) => {
          const {
            data,
            data: { parentId, parentNumber, depth }
          } = result;
          setItemId(row.id!);
          setLoadMenuData({ parentId, parentNumber, depth });
          modalForm.setFieldsValue({
            name: data?.name,
            component: data?.component,
            icon: data?.icon,
            path: data?.path,
            sort: data?.sort,
            description: data?.description,
            func: data?.functionIds,
            parentId: data?.parentId,
            parentNumber: data?.parentNumber,
            depth: data?.depth,
            type: data.type
          });
          setModalShow(true);
        }
      });
    });
  };
  /**
   * 添加子级
   * @param record
   */
  const onCreateChildrenClick = () => {
    getTableSelected(getSelectedRows, (row: any) => {
      if (row.type == MenuTypeEnum.Button) {
        notification.error({
          message: intl.formatMessage({ id: 'function.add.user.menu.description' })
        });
        return;
      }
      setMenuRow(row);
      setModalModel('create');
      setModalTitle('modal.title.create');
      modalForm.setFieldsValue({
        name: '',
        component: '',
        icon: '',
        path: '',
        sort: 0,
        func: [],
        description: ''
      });
      setItemId('');
      setModalShow(true);
    });
  };
  /***
   * 添加 父级
   */
  const onCreateClick = () => {
    modalForm.setFieldsValue({
      name: '',
      component: '',
      icon: '',
      path: '',
      sort: 0,
      func: [],
      depth: 0,
      description: ''
    });
    setItemId('');
    setModalShow(true);
  };
  /**
   * 弹框保存
   */
  const onModalOK = () => {
    modalForm.validateFields().then((values: Store) => {
      const { name, component, icon, path, sort, description, func, type } = values;
      let dep = 0;
      let parentNu = '';
      let parentId = Guid.EMPTY;
      if (menuRow !== undefined) {
        dep = menuRow?.depth! + 1;
        parentNu = menuRow?.parentNumber!;
        parentId = menuRow?.id!;
      } else if (modalModel !== 'create') {
        dep = loadmenudata?.depth ?? 0;
        parentNu = loadmenudata?.parentNumber ?? '';
        parentId = loadmenudata?.parentId ?? Guid.EMPTY;
      }
      let args = {
        name: name,
        component: component,
        icon: icon,
        path: path,
        depth: dep,
        sort: sort,
        type: type,
        description: description,
        parentNumber: parentNu,
        parentId: parentId,
        functionId: func
      };
      if (modalModel === 'create') {
        addMenu(args)
          .then(() => {
            message.success(intl.formatMessage({ id: 'function.add.user.success' }));
            setModalShow(false);
            getMenuList();
          })
          .catch((error: Error) =>
            notification.error({
              message: intl.formatMessage({ id: 'function.add.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'function.add.user.fail.description' })} ${error}`
            })
          );
      } else {
        editMenu({ ...args, id: itemId })
          .then(() => {
            message.success(intl.formatMessage({ id: 'function.add.user.success' }));
            setModalShow(false);
            getMenuList();
          })
          .catch((error: Error) =>
            notification.error({
              message: intl.formatMessage({ id: 'function.add.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'function.add.user.fail.description' })} ${error}`
            })
          );
      }
    });
  };
  /**
   * 获取表格数据
   */
  const getMenuList = () => {
    getMenuTable().catch((error: any) => {
      notification.error({
        message: intl.formatMessage({ id: 'user.function.get.user.list.fail.message' }),
        description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
      });
    });
  };
  /**
   * 获取菜单功能
   * @param id
   */
  const getMenuFunctionList = (id: string) => {
    getMenuFunctionTable(id).catch((error: any) => {
      notification.error({
        message: intl.formatMessage({ id: '加载菜单功能数据失败' }),
        description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
      });
    });
  };

  return (
    <PageContainer>
      <Card>
        <ButtonBar getFun={fun} ref={butBarRef}></ButtonBar>
        {/* <Button type="primary" style={{ marginBottom: 15 }} onClick={onCreateClick}>
          {intl.formatMessage({ id: 'user.button.create' })}
        </Button> */}
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
          columns={columns}
        ></Table>
      </Card>
      <Modal
        visible={modalShow}
        keyboard={false}
        maskClosable={false}
        title={intl.formatMessage({ id: modalTitle })}
        cancelText={intl.formatMessage({
          id: 'modal.cancel.text'
        })}
        okText={intl.formatMessage({
          id: 'modal.ok.text'
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
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'menu.modal.form.item.name.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'menu.modal.form.item.name.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'menu.modal.form.item.name.input.placeholder' })} />
          </Form.Item>
          <Form.Item
            name="path"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'menu.modal.form.item.path.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'menu.modal.form.item.path.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'menu.modal.form.item.path.input.message' })} />
          </Form.Item>
          <Form.Item
            name="component"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'menu.modal.form.item.component.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'menu.modal.form.item.component.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'menu.modal.form.item.component.input.message' })} />
          </Form.Item>
          <Form.Item
            name="icon"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'menu.modal.form.item.icon.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'menu.modal.form.item.icon.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'menu.modal.form.item.icon.input.message' })} />
          </Form.Item>
          <Form.Item name="func" label={intl.formatMessage({ id: 'menu.modal.form.item.functions.label' })}>
            <Select mode="multiple" placeholder={intl.formatMessage({ id: 'menu.modal.form.item.functions.select.placeholder' })}>
              {functions?.map((item: Types.FunctionSelect) => (
                <Select.Option key={item.value} value={item.value!}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" label={intl.formatMessage({ id: 'menu.modal.form.item.menutype.label' })}>
            <Select placeholder={intl.formatMessage({ id: 'menu.modal.form.item.functions.select.menutype' })}>
              {menuType?.map((item: MenuDto.MenuType) => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sort" label={intl.formatMessage({ id: 'menu.modal.form.item.sort.label' })}>
            <InputNumber placeholder={intl.formatMessage({ id: 'menu.modal.form.item.sort.input.message' })} />
          </Form.Item>
          <Form.Item name="description" label={intl.formatMessage({ id: 'menu.modal.form.item.description.label' })} style={{ marginBottom: 0 }}>
            <Input.TextArea allowClear placeholder={intl.formatMessage({ id: 'menu.modal.form.item.description.input.message' })} />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer title="查看菜单功能" width={520} visible={showDrawer} onClose={onCloseDrawer}>
        <Table pagination={false} loading={LoadingObject(menuFunctionLoading)} tableLayout="fixed" size="small" dataSource={menuFunctionItemList} columns={menuFunctionColumns}></Table>
      </Drawer>
    </PageContainer>
  );
};
