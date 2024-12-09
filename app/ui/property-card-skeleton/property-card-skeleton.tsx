import { Card, Flex, Skeleton } from "antd";

export default function PropertyCardSkeleton() {
    return (
        <>
            <Card
                loading
                style={{ width: 240, margin: 10 }}
                cover={<Skeleton.Image active style={{ width: 240, height: 300 }} />}
            >
                <Card.Meta
                    title={<Skeleton />}
                    description={<Skeleton />}
                />
            </Card>
        </>
    );
}