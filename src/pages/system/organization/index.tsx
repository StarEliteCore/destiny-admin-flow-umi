import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Table, notification, Tooltip, Modal, Form, Input, Select } from 'antd';
import { IntlShape, useIntl, useModel } from 'umi';
import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';
import { LoadingObject, modalFormLayout } from '../../../utils/utils';
import { FileAddFilled } from '@ant-design/icons';

export default (): React.ReactNode => {
    const intl: IntlShape = useIntl();
    const [modalForm] = Form.useForm();

    const { loading,itemList,getOrganization }  = useModel('organizationServices');
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('user.modal.title.create');

    useEffect(() => {
        getOrganizationList()
    },[]);
    const getOrganizationList = () => {
        getOrganization().catch((error:any) => {
            notification.error({
                message:intl.formatMessage({id:'user.function.get.user.list.fail.description'}),
                description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
            })
        })
    }
    const columns: Array<ColumnProps<OrganizationDto.OrganizationTable>> = [
        {
            title:(
                <ColumnTitle 
                    name = {intl.formatMessage({
                        id:"organization.table.columns.title"
                    })}/>
            ),
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        // {
        //     title:(
        //         <ColumnTitle 
        //             name = {intl.formatMessage({
        //                 id:"organization.table.columns.disabled"
        //             })}/>
        //     ),
        //     dataIndex: 'disabled',
        //     key: 'disabled',
        //     align: 'center'
        // },
        {
            title:(
                <ColumnTitle 
                    name = {intl.formatMessage({
                        id:"organization.table.columns.depth"
                    })}/>
            ),
            dataIndex: 'depth',
            key: 'depth',
            align: 'center'
        },
        {
            title:(
                <ColumnTitle 
                    name = {intl.formatMessage({
                        id:"organization.table.columns.firstLeader"
                    })}/>
            ),
            dataIndex: 'firstLeader',
            key: 'firstLeader',
            align: 'center'
        },
        {
            title:(
                <ColumnTitle 
                    name = {intl.formatMessage({
                        id:"organization.table.columns.secondLeader"
                    })}/>
            ),
            dataIndex: 'secondLeader',
            key: 'secondLeader',
            align: 'center'
        },
        {
            title:(
                <ColumnTitle 
                    name = {intl.formatMessage({
                        id:"organization.table.columns.operating"
                    })}/>
            ),
            key:'action',
            align:'center',
            render:(_:string,record:OrganizationDto.OrganizationTable) => (
                <div>
                    <Tooltip placement='bottom' title={intl.formatMessage({id:'menu.table.columns.tooltip.add'})}>
                        <FileAddFilled onClick={() => {}}/>
                    </Tooltip>
                </div>
            )
        }
    ]


    return <PageContainer>
        <Card>
            <Button type="primary" style = {{marginBottom:15}} >
                {intl.formatMessage({ id: 'user.button.create' })}
            </Button>
            <Table columns = {columns} dataSource = {itemList} loading = {LoadingObject(loading)}
                rowKey={record => record?.id!} tableLayout="fixed" size="small" pagination={false}
            />
        </Card>
        <Modal visible={modalShow}
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
            // onOk={onModalOK}
            >
            <Form {...modalFormLayout} form={modalForm}>
                <Form.Item name ='name' 
                    rules = {[{
                        required:true,
                        message:intl.formatMessage({id:'organization.model.form.item.name.rule.message'})
                    }]}
                    label={intl.formatMessage({id:'organization.modal.form.item.name.input.placeholder'})}
                >
                    <Input allowClear placeholder = {intl.formatMessage({id:'rganization.model.form.item.name.label'})}/>
                </Form.Item>
                <Form.Item name='ladingCadre'
                    label={intl.formatMessage({id:'organization.model.form.item.ladingcadre.label'})}
                >
                    <Select>

                    </Select>
                </Form.Item>
                
            </Form>

        </Modal>
    </PageContainer>
} 