import { Carousel, Flex } from "antd";
import Image from "next/image";
import SignUpForm from "ui/signup-form";
import room1 from "../../public/assets/room1.1.jpeg";
import room2 from "../../public/assets/room1.2.jpg";
import room3 from "../../public/assets/room1.3.jpg";
import room4 from "../../public/assets/room1.4.jpeg";
import logo from "../../public/assets/RoomForYou.jpg";
import { meriendaFont } from "ui/fonts";

export default function Page() {
    return (
        <>
            <Flex vertical={false} >
                <Flex style={{ width: '50vw', backgroundColor: '#49d' }} vertical align="center" justify="space-around">
                    <br />
                    <div style={{width:'100px', height:'100px', borderRadius:'50%', overflow:'hidden'}} >
                        <Image style={{ width: '100px', height: '100px' }} alt="RoomForYouLogo" src={logo} />
                    </div>
                    <h6 className={meriendaFont.className} style={{margin:0, fontSize: 50}}>RoomForYou</h6>
                    <SignUpForm />
                    <br />
                </Flex>
                <Carousel style={{ width: '50vw'}} autoplay>
                    <div>
                        <Image style={{ width: '100%', height: '120vh' }} alt="room1" src={room1} />
                    </div>
                    <div>
                        <Image style={{ width: '100%', height: '120vh' }} alt="room2" src={room2} />
                    </div>
                    <div>
                        <Image style={{ width: '100%', height: '120vh' }} alt="room3" src={room3} />
                    </div>
                    <div>
                        <Image style={{ width: '100%', height: '120vh' }} alt="room3" src={room4} />
                    </div>
                </Carousel>
            </Flex>
        </>
    )
}