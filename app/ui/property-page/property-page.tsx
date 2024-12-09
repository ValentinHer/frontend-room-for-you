import { Card, Flex, Skeleton } from "antd";

export default function PropertyPage() {

    const numberImages: number[] = [1, 2, 3, 4];

    return (
        <Flex style={{ width: '85%' }} vertical >
            <Flex justify="start" style={{ padding: 2 }} >
                <Skeleton paragraph={{ rows: 0 }} />
            </Flex>
            <Flex wrap style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }} justify="center" >
                <Flex style={{ width: '50%', height: '61.5vh' }}>
                    <Skeleton.Image active style={{ width: '40vw', height: '100%' }} />
                </Flex>
                <Flex wrap style={{ width: '50%', height: '60vh' }} >
                    {numberImages.map((image) => (
                        <Flex key={image} style={{ width: '50%', height: '30vh', overflow: 'hidden', paddingLeft: 10, marginBottom: 10 }} >
                            <Skeleton.Image active style={{ width: '20vw', height: '100%' }} />
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex style={{ width: '100%' }} justify="space-between">
                <Flex vertical style={{ width: '75%' }} >
                    <Flex align="center" style={{ width: '100%', padding: 10, borderRadius: 10, marginBlock: 10 }} >
                        <Skeleton active avatar paragraph={{ rows: 1 }} />
                    </Flex>
                    <Flex style={{ width: '100%', padding: 10, borderRadius: 10, marginBottom: 10 }} >
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </Flex>
                </Flex>
                <Card loading style={{ width: '20%', marginBlock: 10, color: 'white' }} >
                    <Card.Meta
                        description={<Skeleton paragraph={{ rows: 4 }} />}
                    />
                </Card>
            </Flex>
        </Flex>
    );
}