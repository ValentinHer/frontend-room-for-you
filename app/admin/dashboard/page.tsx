'use client'

import { Card, Flex } from "antd";
import { TDataUser } from "types/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "hooks/user-hook";
import dynamic from "next/dynamic";
import { getProperties } from "hooks/property-hook";
import { TDataProps } from "types/property";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Page() {
    const [usersData, setUsersData] = useState(null);
    const [propertiesData, setPropertiesData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        const users = await getAllUsers();
        const result = await getAllUsers(1, users.total);
        const usersLenghtByRole = usersByRole(result.data);
        setUsersData(usersLenghtByRole);

        const properties = await getProperties();
        const resultProperties = await getProperties(1, properties.total);
        const propertiesLenghtByType = propertiesByType(resultProperties.data);
        setPropertiesData(propertiesLenghtByType);

        setLoading(false);
    }

    const usersByRole = (data: TDataUser[]) => {
        const clientsData = data.filter((user) => user.role.name === "cliente");
        const ownersData = data.filter((user) => user.role.name === "propietario");
        const adminsData = data.filter((user) => user.role.name === "admin");
        return {
            Clientes: clientsData.length,
            Administradores: adminsData.length,
            Propietarios: ownersData.length,
        }
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

    const userSeries = [usersData?.Clientes, usersData?.Administradores, usersData?.Propietarios];
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
                        labels: ["Clientes", "Administradores", "Propietarios"],
                        colors: ["#FF6384", "#36A2EB", "#FFCE56"],
                        legend: {
                            position: 'top'
                        },
                        title: {
                            text: "Usuarios",
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
                    }} series={userSeries} type="donut" height={450} />
                </Card>
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