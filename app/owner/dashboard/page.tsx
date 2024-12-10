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
    const [propertiesDataByMonth, setpropertiesDataByMonth] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        const ownerId = await getOwnerData()
        const properties = await getPropertiesByOwner(ownerId);
        const resultProperties = await getPropertiesByOwner(ownerId, 1, properties.total);

        const propertiesLenghtByType = propertiesByType(resultProperties.data);
        setPropertiesData(propertiesLenghtByType);

        const propertiesLenghtByMonth = propertiesByMonth(resultProperties.data);
        setpropertiesDataByMonth(propertiesLenghtByMonth);

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
            Cuartos: roomData.length,
            Departamentos: deparmentData.length,
            Casas: houseData.length
        }
    }

    const propertiesByMonth = (data: TDataProps[]) => {
        const houseData = data.filter((property) => property.type === "casa");
        const deparmentData = data.filter((property) => property.type === "departamento");
        const roomData = data.filter((property) => property.type === "cuarto");

        const houseDataOct = houseData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "10" );
        const houseDataNov = houseData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "11" );
        const houseDataDec = houseData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "12");

        const departmentDataOct = deparmentData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "10" );
        const departmentDataNov = deparmentData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "11" );
        const departmentDataDec = deparmentData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "12");

        const roomDataOct = roomData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "10" );
        const roomDataNov = roomData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "11" );
        const roomDataDec = roomData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "12");

        return {
            Cuartos: [roomDataOct.length, roomDataNov.length, roomDataDec.length],
            Departamentos: [departmentDataOct.length, departmentDataNov.length, departmentDataDec.length],
            Casas: [houseDataOct.length, houseDataNov.length, houseDataDec.length]
        }
    }

    const propertySeries = [propertiesData?.Cuartos, propertiesData?.Departamentos, propertiesData?.Casas];
    const seriesBar = [{
        name: 'Cuartos',
        data: [0, 0, 0, 0, 0, propertiesDataByMonth?.Cuartos[0], propertiesDataByMonth?.Cuartos[1], propertiesDataByMonth?.Cuartos[2]]
    }, {
        name: 'Departamentos',
        data: [0, 0, 0, 0, 0, propertiesDataByMonth?.Departamentos[0], propertiesDataByMonth?.Departamentos[1], propertiesDataByMonth?.Departamentos[2]]
    }, {
        name: 'Casas',
        data: [0, 0, 0, 0, 0, propertiesDataByMonth?.Casas[0], propertiesDataByMonth?.Casas[1], propertiesDataByMonth?.Casas[2]]
    }]

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Flex vertical style={{ marginBottom: 20 }} >
            <Flex style={{ margin: 20, marginTop: 30 }} justify="end" >
                <Card style={{ width: '100%', height: '80vh' }} >
                    <Chart
                        options={{
                            title: {
                                text: "Registro de Propiedades por Mes",
                                align: 'center',
                                style: {
                                    fontSize: '18px'
                                }
                            },
                            plotOptions: {
                                bar: {
                                    horizontal: false,
                                    columnWidth: '55%',
                                    borderRadius: 5,
                                    borderRadiusApplication: 'end'
                                }
                            },
                            dataLabels: {
                                enabled: false
                            },
                            stroke: {
                                show: true,
                                width: 4,
                                colors: ['transparent']
                            },
                            xaxis: {
                                categories: ['May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dic'],
                            },
                            yaxis: {
                                title: {
                                    text: 'Cantidad',
                                }
                            },
                            fill: {
                                opacity: 1
                            },
                            tooltip: {
                                y: {
                                    formatter: (val) => {
                                        return "Cantidad: " + val
                                    }
                                }
                            }
                        }}
                        series={seriesBar}
                        height={450}
                        type="bar"
                    />
                </Card>
            </Flex>
            <Flex style={{ margin: 20, marginTop: 10 }} justify="space-between" >
                <Card hoverable style={{ width: '49%', height: '80vh' }}>
                    <Chart
                        options={{
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
                        }}
                        series={propertySeries}
                        type="donut"
                        height={450}
                    />
                </Card>
            </Flex>
        </Flex>
    );
}