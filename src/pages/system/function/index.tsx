import { Button, Card, Collapse, Form, Input, Modal, Popconfirm, Switch, Table, Tooltip, message, notification } from 'antd';
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
  const { itemList, loading, total, current, pageSize, getFunctionTable, addFunction } = useModel('functionList');
  const [modalForm] = useForm();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = useState<string>('新增功能');
  const [itemId, setItemId] = useState<string>('');

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
    if (modalModel === true) {
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
              message: '新增失败!',
              description: `'失败,错误信息:' ${error}`
            })
          );
      });
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
        <Button type="primary" style={{ marginBottom: 15 }} onClick={onCreateClick}>
          新增
        </Button>
        <Table loading={LoadingObject(loading)} rowKey={(record: Types.FunctionTable) => record?.id!} tableLayout="fixed" size="small" dataSource={itemList} pagination={pagination} columns={columns} />
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
