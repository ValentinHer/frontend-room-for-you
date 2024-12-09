'use client'

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, GetProp, Table, TableProps } from "antd";
import { getAllUsers } from "hooks/user-hook";
import { useEffect, useState } from "react";
import { TDataUser } from "types/user";
import ModalCreateUser from "ui/modal-create-user";

type TColumns<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

type TableParams = {
    pagination?: TablePaginationConfig;
}

const columns: TColumns<TDataUser> = [
    {
        title: 'Nombre',
        dataIndex: 'firstname',
        fixed: 'left',
    },
    {
        title: 'Apellidos',
        dataIndex: 'lastname'
    },
    {
        title: `Número de Teléfono`,
        dataIndex: 'numberPhone'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Rol',
        dataIndex: 'role',
        render: (role) => (<p>{role.name}</p>)
    },
    {
        title: 'Género',
        dataIndex: 'gender'
    },
    {
        title: 'Fecha de Registro',
        dataIndex: 'createdAt',
        render: (date) => {
            return (<p>{new Date(date).toLocaleString()}</p>);
        }
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
    const [usersData, setUsersData] = useState<TDataUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        }
    })

    const getUsers = async () => {
        setLoading(true);
        const users = await getAllUsers();
        setUsersData(users.data);
        setLoading(false);
        setTableParams({
            pagination: {
                ...tableParams.pagination,
                total: users.total
            }
        })
    }

    useEffect(() => {
        getUsers();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize
    ])

    const handleTableChange: TableProps<TDataUser>['onChange'] = (pagination) => {
        setTableParams({
            pagination
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setUsersData([]);
        }
    }

    return (
        <Flex vertical >
            <Flex style={{ margin: 20 }} justify="end" >
                <ModalCreateUser />
            </Flex>
            <Flex style={{ margin: 20, marginTop: 10 }} justify="center" >
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={usersData}
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