'use client'

import { Card, Flex } from "antd";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getPropertiesByOwner } from "hooks/property-hook";
import { TDataProps } from "types/property";
import { getOwnerByUser } from "hooks/owner-hook";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Page() {
    const [propertiesData, setPropertiesData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        const ownerId = await getOwnerData()
        const properties = await getPropertiesByOwner(ownerId);
        const resultProperties = await getPropertiesByOwner( ownerId, 1, properties.total);
        const propertiesLenghtByType = propertiesByType(resultProperties.data);
        setPropertiesData(propertiesLenghtByType);

        setLoading(false);
    }

    const getOwnerData = async () => {
        const userId = sessionStorage.getItem('user');
        const result = await getOwnerByUser(userId);
        return result.id;
    }

    const propertiesByType = (data: TDataProps[]) => {
        const houseData = data.filter((property) => property.type === "casa");
        const deparmentData = data.filter((property) => property.type === "departamento");
        const roomData = data.filter((property) => property.type === "cuarto");

        return {
            Cuartos : roomData.length, 
            Departamentos: deparmentData.length, 
            Casas: houseData.length
        }
    }

    const propertySeries = [propertiesData?.Cuartos, propertiesData?.Departamentos, propertiesData?.Casas];

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Flex vertical >
            <Flex style={{ margin: 20, marginTop: 20 }} justify="space-between" >
                <Card style={{ width: '49%', height: '80vh' }}>
                    <Chart options={{
                        chart: {
                            type: 'donut'
                        },
                        labels: ["Cuartos", "Departamentos", "Casas"],
                        colors: ["#FF5733", "#33FF57", "#3357FF"],
                        legend: {
                            position: 'top'
                        },
                        title: {
                            text: "Propiedades",
                            align: 'center',
                            style: {
                                fontSize: "18px"
                            }
                        },
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        total: {
                                            show: true,
                                            showAlways: true
                                        }
                                    }
                                }
                            }
                        }
                    }} series={propertySeries} type="donut" height={450} />
                </Card>
            </Flex>
        </Flex>
    );
}