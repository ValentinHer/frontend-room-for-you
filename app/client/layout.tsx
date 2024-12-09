'use client'

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, Flex, Layout as Lay, MenuProps } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { getClient } from "hooks/client-hook";
import { ReactNode, useEffect, useState } from "react";
import LogoHeader from "ui/logo-header";
import {useRouter} from "next/navigation";
import { logoutUser } from "hooks/user-hook";

const { Header, Footer, Content } = Lay;

export default function Layout({ children }: { children: ReactNode }) {
    const [username, setUserName] = useState('');
    const router = useRouter();

    const getClientName = async () => {
        const userId = sessionStorage.getItem('user')
        const result = await getClient(userId)
        const clientName = `${result.user.firstname} ${result.user.lastname}`.toUpperCase()
        setUserName(clientName);
    }

    const onLogOut = async () => {
        const logout = await logoutUser();
        sessionStorage.clear();
        router.push("/login");
    }

    useEffect(() => {
        getClientName();
    }, [])


    const items: MenuProps['items'] = [
        {
            key: 1,
            label: <p>{username}</p>,
            disabled: true
        },
        {
            type: 'divider'
        },
        {
            key: 2,
            label: 'Perfil',
            
        },
        {
            key: 3,
            label: 'Cerrar Sesión',
            icon: <LogoutOutlined />,
            onClick: onLogOut
        }
    ]

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: '#1677ff',
                        footerBg: '#b35e0f'
                    }
                }
            }}
        >
            <Lay>
                <Header style={{ display: 'flex', paddingInline: 20, position: 'sticky', top: 0, zIndex: 1}} >
                    <Flex align="center" >
                        <LogoHeader />
                    </Flex>
                    <Flex align="center" style={{ marginLeft: 'auto' }} >
                        <Dropdown menu={{items}} >
                            <Avatar onClick={(e) => e.preventDefault()} style={{ backgroundColor: '#ff8616' }} icon={<UserOutlined />} size={35} />
                        </Dropdown>
                    </Flex>
                </Header>
                <Content>{children}</Content>
            </Lay>
        </ConfigProvider>
    );
}