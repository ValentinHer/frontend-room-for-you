import { Menu } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function OwnerMenu() {
    return (
        <Menu
        theme="dark"
        mode="inline"
        items={[
            {
                key: '1',
                icon: <PieChartOutlined />,
                label: (
                    <Link href={'/owner/dashboard'}>
                    </Link>
                )
            }
        ]}
         />
    );
}