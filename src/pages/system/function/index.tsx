import { Button, Card, Collapse, Form, Input, Modal, Switch, Table, Tooltip, message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { LoadingObject, modalFormLayout, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import { ColumnProps } from 'antd/lib/table';
import ColumnTitle from '@/components/ColumnTitle';
import { PageContainer } from '@ant-design/pro-layout';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import moment from 'moment';
import { useForm } from 'antd/lib/form/util';
import { useModel } from 'umi';

export default (): React.ReactNode => {
  const { itemList, loading, total, current, pageSize, getFunctionTable, addFunction, updateFunction, deleteFunction } = useModel('functionList');
  const [modalForm] = useForm();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = useState<string>('新增功能');
  const [itemId, setItemId] = useState<string>('');
  const [getSelectedRows, setSelectedRows] = useState<any[]>([]);
  useEffect(() => {
    getFunctionTable({ pageIndex: 1, pageSize: 10 });
  }, []);
  const columns: Array<ColumnProps<Types.FunctionTable>> = [
    {
      title: <ColumnTitle name="功能名称" />,
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: <ColumnTitle name="控制器" />,
      dataIndex: 'controller',
      key: 'controller',
      align: 'center'
    },
    {
      title: <ColumnTitle name="方法" />,
      dataIndex: 'action',
      key: 'action',
      align: 'center'
    },
    {
      title: <ColumnTitle name="创建时间" />,
      dataIndex: 'createdTime',
      key: 'createdTime',
      align: 'center',
      render: (text: string) => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : undefined)
    },
    {
      title: <ColumnTitle name="修改时间" />,
      dataIndex: 'lastModifierTime',
      key: 'lastModifierTime',
      align: 'center',
      render: (text: string) => (text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : undefined)
    },
    {
      title: <ColumnTitle name="是否可用" />,
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      align: 'center',
      render: (text) => {
        return text === true ? '是' : '否';
      }
    },
    {
      title: <ColumnTitle name="描述" />,
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    }
  ];
  const onCreateClick = () => {
    setModalModel(true);
    setModalTitle('新增');
    modalForm.setFieldsValue({
      name: '',
      controller: '',
      action: '',
      isEnabled: true,
      description: ''
    });
    setItemId('');
    setModalShow(true);
  };

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
  const onUpdateClick = () => {
    // setModalModel(false);
    setModalTitle('修改');
    getTableSelected(getSelectedRows, (row: any) => {
      modalForm.setFieldsValue({
        name: row.name,
        controller: row.controller,
        action: row.action,
        isEnabled: row.isEnabled,
        description: row.description
      });
      setItemId(row.id);
      setModalShow(true);
    });
  };
  const onDeleteClick = () => {
    getTableSelected(getSelectedRows, (row: any) => {
      deleteFunction(row.id)
        .then(() => {
          message.success('删除失败');
          getFunctionList(1, 10);
        })
        .catch((error: Error) => message.error(`'删除失败,错误信息:' ${error}`));
    });
  };

  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total,
    current,
    pageSize,
    onShowSizeChange: (current: number, pageSize: number) => {
      getFunctionList(current, pageSize);
    },
    onChange: (page: number, pageSize?: number) => {
      getFunctionList(page, pageSize ?? 10);
    }
  };
  const getFunctionList = (current: number, pageSize: number, args: any = {}) => {
    getFunctionTable({ pageIndex: current, pageSize, ...args }).catch((error: Error) => {
      notification.error({
        message: '获取信息失败!!',
        description: `'获取数据失败,错误信息:${error}`
      });
    });
  };
  const onModalOK = () => {
    if (itemId === '') {
      modalForm.validateFields().then((values: Store) => {
        const { name, controller, action, isEnabled, description } = values;

        let args = {
          name: name,
          controller: controller,
          action: action,
          description: description,
          isEnabled: isEnabled
        };
        addFunction(args)
          .then(() => {
            message.success('保存成功');
            getFunctionList(1, 10);
            setModalShow(false);
          })
          .catch((error: Error) =>
            notification.error({
              message: '保存失败!',
              description: `'失败,错误信息:' ${error}`
            })
          );
      });
    } else {
      modalForm.validateFields().then((values: Store) => {
        const { name, controller, action, isEnabled, description } = values;

        let args = {
          name: name,
          controller: controller,
          action: action,
          description: description,
          isEnabled: isEnabled,
          id: itemId
        };
        updateFunction(args)
          .then(() => {
            message.success('保存成功');
            getFunctionList(1, 10);
            setModalShow(false);
          })
          .catch((error: Error) =>
            notification.error({
              message: '新增失败!',
              description: `'失败,错误信息:' ${error}`
            })
          );
      });
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows);
    }
  };
  return (
    <PageContainer>
      <Card>
        <Collapse accordion>
          <Collapse.Panel header="查询面板" key="1"></Collapse.Panel>
        </Collapse>
      </Card>
      <Card>
        <Tooltip placement="bottom" title="新增">
          <Button shape="circle" icon={<PlusOutlined />} type="primary" style={{ margin: '0px 10px 15px 10px' }} onClick={onCreateClick} />
        </Tooltip>
        <Tooltip placement="bottom" title="修改">
          <Button shape="circle" icon={<EditOutlined />} type="primary" style={{ margin: '0px 10px 15px 10px' }} onClick={onUpdateClick} />
        </Tooltip>
        <Tooltip placement="bottom" title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} type="primary" style={{ margin: '0px 10px 15px 10px' }} onClick={onDeleteClick} />
        </Tooltip>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          loading={LoadingObject(loading)}
          rowKey={(record: Types.FunctionTable) => record?.id!}
          tableLayout="fixed"
          size="small"
          dataSource={itemList}
          pagination={pagination}
          columns={columns}
        />
      </Card>
      <Modal
        visible={modalShow}
        title={modalTitle}
        cancelText="取消"
        okText="保存"
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
                message: '请填写功能名称'
              }
            ]}
            label="功能名称"
          >
            <Input allowClear placeholder="请输入功能名称！！！" />
          </Form.Item>
          <Form.Item
            name="controller"
            label="控制器"
            rules={[
              {
                required: true,
                message: '请填写控制器'
              }
            ]}
          >
            <Input allowClear placeholder="请输入控制器！！！" />
          </Form.Item>
          <Form.Item name="action" label="方法">
            <Input allowClear placeholder="请输入方法！！！" />
          </Form.Item>
          <Form.Item name="isEnabled" label="是否可用" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>

          <Form.Item name="description" label="描述" style={{ marginBottom: 0 }}>
            <Input.TextArea allowClear placeholder="请输入描述！！" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
