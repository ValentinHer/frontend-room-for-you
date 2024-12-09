'use client'

import { Flex, GetProps, Pagination, PaginationProps, Spin } from "antd";
import { getFiles } from "hooks/file-hooks";
import { getProperties } from "hooks/property-hook";
import { useEffect, useState } from "react";
import { TDataProperty } from "types/property";
import PropertyCard from "ui/property-card";
import PropertyCardSkeleton from "ui/property-card-skeleton";


export default function Page() {
    const [data, setData] = useState<TDataProperty[]>([]);
    const [loading, setLoading] = useState(false);
    const [cardParams, setCardParams] = useState<PaginationProps>({
        current: 1,
        pageSize: 10
    });
    const [pageSiz, setPageSiz] = useState<number[]>([]);

    const getAllProperties = async () => {
        setLoading(true);
        setPageSize(cardParams?.pageSize);
        const result = await getProperties(cardParams?.current, cardParams?.pageSize);
        const dataWithFiles = await getFilesToProperty(result.data);
        setData(dataWithFiles);
        setLoading(false);
        setCardParams({
            ...cardParams,
            total: result.total
        })
    }

    const setPageSize = (pagesize: number) => {
        const pageLimit: number[] = [];
        for(let i=0; i < pagesize; i++){
            pageLimit.push(i);
        }

        setPageSiz(pageLimit);
    }

    const getFilesToProperty = async (data: TDataProperty[]) => {
        const dataModificate = [];

        for (let i = 0; i < data.length; i++) {
            const id = data[i].id;
            const result = await getFiles(id);
            dataModificate.push({...data[i], url: result});
        }

        return dataModificate;
    }

    useEffect(() => {
        getAllProperties();
    }, [
        cardParams?.current
    ])

    const onChange: PaginationProps['onChange'] = (current) => {
        setCardParams({
            current
        })
    }

    return (
        <>
            <Flex style={{ padding: 20 }} wrap justify="center" >
                {loading ? pageSiz?.map((page) => (<PropertyCardSkeleton />)) : data?.map((property) => (<PropertyCard key={property.id} {...property} />))}
            </Flex>
            <Flex justify="center" style={{padding: 20}}>
                <Pagination showQuickJumper current={cardParams.current} total={cardParams.total} onChange={onChange} />
            </Flex>
        </>
    );
}