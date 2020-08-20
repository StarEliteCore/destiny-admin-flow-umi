import { Button, Card, Divider, Form, Input, InputNumber, Modal, Popconfirm, Table, Tooltip, message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, FileAddFilled, WarningOutlined } from '@ant-design/icons';
import { IntlShape, useIntl, useModel } from 'umi';
import { LoadingObject, modalFormLayout } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';
import { Guid } from 'guid-typescript';
import { PageContainer } from '@ant-design/pro-layout';
import { Store } from 'antd/lib/form/interface';

export default (): React.ReactNode => {
  const intl: IntlShape = useIntl();
  const [modalForm] = Form.useForm();

  const { loading, itemList, getDataDictionary, getDataDictionaryLoad, addDataDictionary, editDataDictonary, delDataDictionary } = useModel('system.dataDictionary.dataDictionaryServices');
  const [] = useState<boolean>(false);
  const [dataDictionaryRow, setDataDictionaryRow] = useState<DataDictionaryDto.DataDictionaryTable>();
  const [dataDictionaryModel, setDataDictionaryModel] = useState<string>('create');
  const [modalTitle, setModalTitle] = useState<string>('user.modal.title.create');
  const [itemId, setItemId] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(false);

  useEffect(() => {
    getDataDictionaryList();
  }, []);

  const getDataDictionaryList = () => {
    getDataDictionary().catch((error: any) => {
      notification.error({
        message: intl.formatMessage({ id: 'user.function.get.user.list.fail.description' }),
        description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
      });
    });
  };
  /**
   * 表格列
   */
  const columns: Array<ColumnProps<DataDictionaryDto.DataDictionaryTable>> = [
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'datadictionary.table.columns.title'
          })}
        />
      ),
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'datadictionary.table.columns.value'
          })}
        />
      ),
      dataIndex: 'value',
      key: 'value',
      align: 'center'
    },
    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'datadictionary.table.columns.remark'
          })}
        />
      ),
      dataIndex: 'remark',
      key: 'remark',
      align: 'center'
    },

    {
      title: (
        <ColumnTitle
          name={intl.formatMessage({
            id: 'datadictionary.table.columns.sort'
          })}
        />
      ),
      dataIndex: 'sort',
      key: 'sort',
      align: 'center'
    },
    {
      title: <ColumnTitle name={intl.formatMessage({ id: 'datadictionary.table.columns.operating' })} />,
      key: 'action',
      align: 'center',
      render: (_: string, record: DataDictionaryDto.DataDictionaryTable) => (
        <div>
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.add' })}>
            <FileAddFilled onClick={() => onCreateChildrenClick(record)} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.modify' })}>
            <EditOutlined onClick={() => onEditClick(record)} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.delete' })}>
            <Popconfirm placement="top" title={intl.formatMessage({ id: 'menu.table.columns.tooltip.title' })} onConfirm={() => onDeleteClick(record.id!)} icon={<WarningOutlined />}>
              <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
            </Popconfirm>
          </Tooltip>
        </div>
      )
    }
  ];
  /**
   * 添加子集按钮触发事件
   * @param record
   */
  const onCreateChildrenClick = (record: DataDictionaryDto.DataDictionaryTable) => {
    setDataDictionaryRow(record);
    setDataDictionaryModel('create');
    setModalTitle('modal.title.create');
    modalForm.setFieldsValue({
      title: '',
      value: '',
      remark: '',
      sort: 0,
      code: ''
    });
    setItemId('');
    setModalShow(true);
  };
  /**
   * 添加按钮事件
   */
  const onCreateClick = () => {
    modalForm.setFieldsValue({
      title: '',
      value: '',
      remark: '',
      sort: 0,
      code: ''
    });
    setItemId('');
    setModalShow(true);
  };
  const [] = useState<{ parentId?: string }>({});
  const onEditClick = (record: DataDictionaryDto.DataDictionaryTable) => {
    setDataDictionaryModel('edit');
    setModalTitle('modal.title.modify');
    setItemId(record.id!);
    getDataDictionaryLoad({
      payload: { id: record.id },
      callback: (result: any) => {
        const { data } = result;
        modalForm.setFieldsValue({
          title: data?.title,
          value: data?.value,
          remark: data?.remark,
          sort: data?.sort,
          code: data?.code,
          parentId: data?.parentId
        });
      }
    });
    setModalShow(true);
  };
  /**
   * 确认按钮事件
   */
  const onModalOK = () => {
    modalForm.validateFields().then((values: Store) => {
      const { title, value, remark, sort, code } = values;
      let parentId = Guid.EMPTY;
      if (dataDictionaryRow !== undefined) {
        parentId = dataDictionaryRow?.id!;
      } else if (dataDictionaryModel !== 'create') {
        //修改
      }
      let args = {
        title: title,
        value: value,
        remark: remark,
        sort: sort,
        code: code,
        parentId: parentId
      };
      if (dataDictionaryModel === 'create') {
        addDataDictionary(args)
          .then(() => {
            message.success(intl.formatMessage({ id: 'function.add.user.success' }));
            setModalShow(false);
            getDataDictionaryList();
          })
          .catch((error: Error) =>
            notification.error({
              message: intl.formatMessage({ id: 'function.add.user.fail.message' }),
              description: `${intl.formatMessage({ id: 'function.add.user.fail.description' })} ${error}`
            })
          );
      } else {
        // 修改
        editDataDictonary({ ...args, id: itemId })
          .then(() => {
            message.success(intl.formatMessage({ id: 'function.add.user.success' }));
            setModalShow(false);
            getDataDictionaryList();
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
  const onDeleteClick = (id: string) => {
    delDataDictionary(id)
      .then(() => {
        message.success(intl.formatMessage({ id: 'user.function.delete.click.success' }));
        getDataDictionaryList();
      })
      .catch((error: Error) => message.error(`${intl.formatMessage({ id: 'user.function.delete.click.fail' })}:${error}`));
  };
  return (
    <PageContainer>
      <Card>
        <Button type="primary" style={{ marginBottom: 15 }} onClick={onCreateClick}>
          {intl.formatMessage({ id: 'user.button.create' })}
        </Button>
        <Table columns={columns} dataSource={itemList} loading={LoadingObject(loading)} rowKey={record => record?.id!} tableLayout="fixed" size="small" pagination={false} />
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
        {/* 表单 */}
        <Form {...modalFormLayout} form={modalForm}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'datadictionary.modal.form.item.title.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'datadictionary.modal.form.item.title.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'datadictionary.modal.form.item.title.input.placeholder' })} />
          </Form.Item>
          <Form.Item
            name="value"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'datadictionary.modal.form.item.value.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'datadictionary.modal.form.item.value.label' })}
          >
            <Input allowClear placeholder={intl.formatMessage({ id: 'datadictionary.modal.form.item.value.input.placeholder' })} />
          </Form.Item>
          <Form.Item name="remark" label={intl.formatMessage({ id: 'datadictionary.modal.form.item.remark.label' })}>
            <Input allowClear placeholder={intl.formatMessage({ id: 'datadictionary.modal.form.item.remark.input.placeholder' })} />
          </Form.Item>
          <Form.Item name="sort" label={intl.formatMessage({ id: 'datadictionary.modal.form.item.sort.label' })}>
            <InputNumber placeholder={intl.formatMessage({ id: 'datadictionary.modal.form.item.sort.input.placeholder' })} />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'datadictionary.modal.form.item.code.rule.message' })
              }
            ]}
            label={intl.formatMessage({ id: 'datadictionary.modal.form.item.code.label' })}
          >
            <Input placeholder={intl.formatMessage({ id: 'datadictionary.modal.form.item.code.input.placeholder' })} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
