'use client'

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Flex, Layout as Lay, Row, Space } from "antd";
import { getOwnerByUser } from "hooks/owner-hook";
import { logoutUser } from "hooks/user-hook";
import React, { useEffect, useState } from "react";
import OwnerMenu from "ui/owner-menu";
import { usePathname, useRouter } from "next/navigation";

const { Sider, Content } = Lay;


export default function Layout({ children }: { children: React.ReactNode }) {
    const [userName, setUserName] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const getOwner = async () => {
        const userId = sessionStorage.getItem('user');
        const owner = await getOwnerByUser(userId);
        const username = `${owner.user.firstname} ${owner.user.lastname}`.toUpperCase();
        setUserName(username);
    }

    const onLogOut = async () => {
        const logout = await logoutUser();
        sessionStorage.clear();
        router.push("/login");
    }

    useEffect(() => {
        getOwner()
    }, [])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        siderBg: "#011222",
                        // bodyBg: "#ddd"
                    }
                }
            }}
        >
            <Lay>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{overflow: 'auto', position: 'fixed', height: '100vh', width: '100vw'}} >
                    <Flex style={{ flexDirection: 'column', height: '100%' }}>
                        <Row style={{ marginBlock: `${collapsed ? '2vh' : '2vh'}`, marginLeft: `${collapsed ? '18px' : '5px'}` }}>
                            <Space size={'small'}>
                                <a onClick={() => setCollapsed(!collapsed)}>
                                    <Avatar icon={<UserOutlined />} size={'large'} style={{ backgroundColor: 'yellow' }} />
                                </a>
                                {collapsed ? null : <h4 style={{ color: 'white' }}>{userName}</h4>}
                            </Space>
                        </Row>
                        <OwnerMenu pathname={pathname} />
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultBg: 'transparent',
                                        defaultColor: '#fff',
                                        defaultBorderColor: '#ff8616',
                                        defaultHoverBg: '#ff8616',
                                        defaultHoverColor: '#fff',
                                        defaultHoverBorderColor: '#ff8616',
                                        defaultActiveBg: '#ff8616',
                                        defaultActiveBorderColor: 'none',
                                        defaultActiveColor: '#fff'
                                    }
                                }
                            }}
                        >
                            <Button type="default" onClick={() => onLogOut()} style={{ marginTop: 'auto', marginBottom: '8px', marginInline: '3px' }}>
                                <LogoutOutlined />
                                {collapsed ? null : <p>Cerrar Sesión</p>}
                            </Button>
                        </ConfigProvider>
                    </Flex>
                </Sider>
                <Lay style={{marginInlineStart: parseInt(`${collapsed ? 90 : 200}`), height: '100%'}} >
                    <Content style={{overflow: 'initial'}} >
                        {children}
                    </Content>
                </Lay>
            </Lay>
        </ConfigProvider>
    );
}