import { ConfigProvider, Menu } from "antd";
import { FormOutlined, PieChartOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function OwnerMenu({pathname}: {pathname: string}) {

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
                        key: '/owner/dashboard',
                        icon: <PieChartOutlined />,
                        label: (
                            <Link href={'/owner/dashboard'}>
                                Dashboard
                            </Link>
                        ),
                    },
                    {
                        key: '/owner/properties',
                        icon: <FormOutlined />,
                        label: (
                            <Link href={'/owner/properties'}>
                                Propiedades
                            </Link>
                        )
                    }
                ]}
            />
        </ConfigProvider>
    );
}