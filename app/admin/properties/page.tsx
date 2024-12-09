'use client'

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, GetProp, Table, TableProps } from "antd";
import { getFiles } from "hooks/file-hooks";
import { getProperties } from "hooks/property-hook";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TDataProperty } from "types/property";
import ModalCreateProperty from "ui/modal-create-property";

type TColumns<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

type TableParams = {
    pagination?: TablePaginationConfig;
}

const columns: TColumns<TDataProperty> = [
    {
        title: 'Imagen',
        width: 100,
        dataIndex: 'url',
        render: (url) => {
            if (Array.isArray(url) && url.length > 0) {
                return (
                    <Image src={url[0]} alt="imagen" width={100} height={50} style={{ objectFit: 'cover' }} />
                );
            }

            return (<p>No Disponible</p>)
        }
    },
    {
        title: 'Title',
        dataIndex: 'title',
        fixed: 'left',
    },
    {
        title: 'Tipo',
        dataIndex: 'type'
    },
    {
        title: 'Dirección',
        dataIndex: 'address'
    },
    {
        title: 'Tipo de transacción',
        dataIndex: 'transactionType'
    },
    {
        title: 'Precio',
        dataIndex: 'price'
    },
    {
        title: 'Estado',
        dataIndex: 'state'
    },
    {
        title: 'Descripción',
        dataIndex: 'description'
    },
    {
        title: 'Características',
        dataIndex: 'features'
    },
    {
        title: 'Acciones',
        fixed: 'right',
        width: 100,
        render: () => {
            return (
                <>
                    <Flex justify="space-between">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultBg: '#ff8616',
                                        defaultColor: '#fff',
                                        defaultBorderColor: 'none',
                                        defaultHoverBg: '#ffa838',
                                        defaultHoverColor: '#fff',
                                        defaultHoverBorderColor: 'none',
                                        defaultActiveBg: '#ff8616',
                                        defaultActiveBorderColor: 'none',
                                        defaultActiveColor: '#fff'
                                    }
                                }
                            }}
                        >
                            <Button icon={<EditOutlined />} />
                        </ConfigProvider>
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Flex>
                </>
            )
        }
    }
]

export default function Page() {
    const [data, setData] = useState<TDataProperty[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        }
    })

    const getOwnerProperties = async () => {
        setLoading(true);
        const result = await getProperties(tableParams.pagination?.current, tableParams.pagination?.pageSize);
        const dataWithFiles = await getFilesToProperty(result.data);
        setData(dataWithFiles);
        setLoading(false);
        setTableParams({
            pagination: {
                ...tableParams.pagination,
                total: result.total
            }
        })
    }

    const getFilesToProperty = async (data: TDataProperty[]): Promise<TDataProperty[]> => {
        const dataModificate = []

        for (let i = 0; i < data.length; i++) {
            const id = data[i].id;
            const result = await getFiles(id);
            dataModificate.push({...data[i], url: result});
        }

        return dataModificate;
    }

    useEffect(() => {
        getOwnerProperties();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize
    ])

    const handleTableChange: TableProps<TDataProperty>['onChange'] = (pagination) => {
        setTableParams({
            pagination
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    }

    return (
        <Flex vertical >
            <Flex style={{ margin: 20, marginTop: 30 }} justify="center" >
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    bordered
                    style={{ width: '90%' }}
                    onChange={handleTableChange}
                    scroll={{ x: 'max-content' }}
                />
            </Flex>
        </Flex>
    )
}