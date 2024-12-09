import { Space } from "antd";
import logo from "../../../public/assets/RoomForYou.jpg";
import Image from "next/image";
import { meriendaFont } from "ui/fonts";

export default function LogoHeader() {
    return (
        <Space >
            <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
                <Image alt="logo" src={logo} width={50} height={50} style={{ objectFit: 'cover' }} />
            </div>
            <h1 className={meriendaFont.className} style={{color: '#fff'}} >RoomForYou</h1>
        </Space>
    );
}