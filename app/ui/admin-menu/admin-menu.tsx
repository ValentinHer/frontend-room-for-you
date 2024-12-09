import { ConfigProvider, Menu } from "antd";
import { FormOutlined, PieChartOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function AdminMenu({pathname}: {pathname: string}) {

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        darkItemSelectedBg: '#ff8616',
                        darkItemBg: '#011222',
                        darkItemHoverBg: '#aa5500'
                    }
                }
            }}
        >
            <Menu
                theme='dark'
                mode="inline"
                defaultSelectedKeys={[pathname]}
                items={[
                    {
                        key: '/admin/dashboard',
                        icon: <PieChartOutlined />,
                        label: (
                            <Link href={'/admin/dashboard'}>
                                Dashboard
                            </Link>
                        ),
                    },
                    {
                        key: '/admin/users',
                        icon: <FormOutlined />,
                        label: (
                            <Link href={'/admin/users'}>
                                Usuarios
                            </Link>
                        )
                    },
                    {
                        key: '/admin/properties',
                        icon: <FormOutlined />,
                        label: (
                            <Link href={'/admin/properties'}>
                                Propiedades
                            </Link>
                        )
                    }
                ]}
            />
        </ConfigProvider>
    );
}