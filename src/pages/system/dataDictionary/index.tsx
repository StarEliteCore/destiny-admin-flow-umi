import React, { useEffect, useState } from 'react';
import { Card, Button, Table, notification } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { IntlShape, useIntl, useModel } from 'umi';
import { LoadingObject } from '@/utils/utils';
import { ColumnProps } from 'antd/lib/table/Column';
import ColumnTitle from '@/components/ColumnTitle';



export default (): React.ReactNode => {
    const intl: IntlShape = useIntl();
    const { loading, itemList, getDataDictionary } = useModel('dataDictionaryServices');

    useEffect(() => {
        getDataDictionaryList();
    }, []);

    const getDataDictionaryList = () => {
        getDataDictionary().catch((error: any) => {
            notification.error({
                message: intl.formatMessage({ id: 'user.function.get.user.list.fail.description' }),
                description: `${intl.formatMessage({ id: 'user.function.get.user.list.fail.description' })} ${error}`
            })
        })
    }

    /**
     * 表格列
     */
    const columns: Array<ColumnProps<DataDictionaryDto.DataDictionaryTable>> = [
        {
            title: (
                < ColumnTitle
                    name={intl.formatMessage({
                        id: 'datadictionary.table.columns.title'
                    })} />
            ),
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: (
                < ColumnTitle
                    name={intl.formatMessage({
                        id: 'datadictionary.table.columns.value'
                    })} />

            ),
            dataIndex: 'value',
            key: 'value',
            align: 'center'
        },
        {
            title: (
                < ColumnTitle
                    name={intl.formatMessage({
                        id: 'datadictionary.table.columns.remark'
                    })} />

            ),
            dataIndex: 'remark',
            key: 'remark',
            align: 'center'
        },

        {
            title: (
                < ColumnTitle
                    name={intl.formatMessage({
                        id: 'datadictionary.table.columns.sort'
                    })} />

            ),
            dataIndex: 'sort',
            key: 'sort',
            align: 'center'
        },
        {
            title: (
                < ColumnTitle
                    name={intl.formatMessage({
                        id: 'datadictionary.table.columns.parentid'
                    })} />

            ),
            dataIndex: 'parentId',
            key: 'parentId',
            align: 'center'
        },
    ]
    return <PageContainer>
        <Card>
            <Button type='primary' style={{ marginBottom: 15 }} >
                {intl.formatMessage({ id: 'user.button.create' })}
            </Button>
            <Table columns={columns} dataSource={itemList} loading={LoadingObject(loading)} />
        </Card>
    </PageContainer>


}  