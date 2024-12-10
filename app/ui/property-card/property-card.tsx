import { Card } from "antd";
import imagen1 from "../../../public/assets/room1.1.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Meta } = Card;
type TData = {
    id: string;
    title: string;
    type: string;
    address: string;
    transactionType: string;
    price: number;
    description: string;
    features: string;
    state: string;
    url: string[] | object;
    createdAt: string;
    updatedAt: string;
}

export default function PropertyCard(data: TData) {
    const router = useRouter();

    const redirectProperty = () => {
        router.push(`/client/properties/${data.id}`);
    }


    return (
        <Card
            style={{ width: 240, margin: 10}}
            hoverable
            cover={<Image alt={data.title} width={240} height={300} src={Array.isArray(data.url) && data.url.length > 0 ? data.url[0] : imagen1} style={{ objectFit: 'cover' }} />}
            onClick={redirectProperty}
        >
            <Meta
                title={data.title}
                description={data.price}
            />
        </Card>
    );
}