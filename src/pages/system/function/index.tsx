import { Button, Card, Col, Form, Input, Modal, Row, Switch, Table, message, notification } from 'antd';
import { ConditionInfo, Conditions, Operation } from '@/interface';
import { FilterConnect, FilterOperator } from '@/enumerate';
import { LoadingObject, modalFormLayout, tacitPagingProps } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';

import ButtonBar from '@/components/ButtonBar';
import { ColumnProps } from 'antd/lib/table';
import ColumnTitle from '@/components/ColumnTitle';
import { PageContainer } from '@ant-design/pro-layout';
import { PaginationProps } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import moment from 'moment';
import { useModel } from 'umi';

export default (): React.ReactNode => {
  const { itemList, loading, total, current, pageSize, getFunctionTable, addFunction, updateFunction, deleteFunction } = useModel('system.function.functionList');
  const [modalForm] = Form.useForm();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [, setModalModel] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = useState<string>('新增功能');
  const [itemId, setItemId] = useState<string>('');
  const [getSelectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchForm] = Form.useForm();
  const butBarRef = useRef<any>(null);
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
      title: <ColumnTitle name="链接URL" />,
      dataIndex: 'linkUrl',
      key: 'linkUrl',
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
      render: text => {
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
  const fun = () => {
    const clickarr = [
      { name: 'add', click1: onCreateClick },
      { name: 'update', click1: onUpdateClick },
      { name: 'delete', click1: onDeleteClick }
    ];
    console.log(butBarRef.current.itemclick);
    const index = clickarr.findIndex((x: any) => x.name == butBarRef.current.itemclick);
    console.log(index);
    if (index >= 0) {
      let clickmodel = clickarr[index];
      clickmodel.click1();
    }
  };

  const onCreateClick = () => {
    setModalModel(true);
    setModalTitle('新增');
    modalForm.setFieldsValue({
      name: '',
      linkUrl: '',
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
        linkUrl: row.linkUrl,
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
      let args = searchForm.getFieldsValue();
      let filter = getSearchFilter(args);
      getFunctionList(current, pageSize, filter);
    },
    onChange: (page: number, pageSize?: number) => {
      let args = searchForm.getFieldsValue();
      let filter = getSearchFilter(args);
      getFunctionList(page, pageSize ?? 10, filter);
    }
  };
  const getFunctionList = (current: number, pageSize: number, args: Conditions[] = []) => {
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
    getFunctionTable(operationProps).catch((error: Error) => {
      notification.error({
        message: '获取信息失败!!',
        description: `'获取数据失败,错误信息:${error}`
      });
    });
  };
  const onModalOK = () => {
    if (itemId === '') {
      modalForm.validateFields().then((values: Store) => {
        const { name, linkUrl, isEnabled, description } = values;

        let args = {
          name: name,
          linkUrl: linkUrl,
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
        const { name, linkUrl, isEnabled, description } = values;

        let args = {
          name: name,
          linkUrl: linkUrl,
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

  const getSearchFormInfo = () => {
    const conditions: ConditionInfo[] = [new ConditionInfo('name', FilterOperator.LIKE)];
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
    getFunctionList(1, 10, filter);
  };
  return (
    <PageContainer>
      <Card>
        <Form onFinish={handleSearch} form={searchForm}>
          <Row gutter={32}>
            <Col span={8}>
              <Form.Item name="name" label="功能名字" style={{ marginBottom: 0 }}>
                <Input allowClear placeholder="请输入查询功能名字！！" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <span style={{ float: 'right' }}>
                <Button type="primary" htmlType="submit">
                  查询
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
            name="linkUrl"
            label="链接URL"
            rules={[
              {
                required: true,
                message: '链接URL不能为空'
              }
            ]}
          >
            <Input allowClear placeholder="链接URL" />
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
