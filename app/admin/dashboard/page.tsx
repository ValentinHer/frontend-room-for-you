'use client'

import { Card, Flex } from "antd";
import { TDataUser } from "types/user";
import { use, useEffect, useState } from "react";
import { getAllUsers } from "hooks/user-hook";
import dynamic from "next/dynamic";
import { getProperties } from "hooks/property-hook";
import { TDataProps } from "types/property";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Page() {
    const [usersData, setUsersData] = useState(null);
    const [usersDataByMonth, setUsersDataByMonth] = useState(null);
    const [propertiesData, setPropertiesData] = useState(null);
    const [propertiesDataByMonth, setpropertiesDataByMonth] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        const users = await getAllUsers();
        const result = await getAllUsers(1, users.total);
        const usersLenghtByRole = usersByRole(result.data);
        setUsersData(usersLenghtByRole);

        const usersLenghtByMonth = usersByMonth(result.data);
        setUsersDataByMonth(usersLenghtByMonth);

        const properties = await getProperties();
        const resultProperties = await getProperties(1, properties.total);
        const propertiesLenghtByType = propertiesByType(resultProperties.data);
        setPropertiesData(propertiesLenghtByType);

        const properetiesLenghtByMonth = propertiesByMonth(resultProperties.data);
        setpropertiesDataByMonth(properetiesLenghtByMonth);

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

    const usersByMonth = (data: TDataUser[]) => {
        const clientsData = data.filter((user) => user.role.name === "cliente");
        const ownersData = data.filter((user) => user.role.name === "propietario");
        const adminsData = data.filter((user) => user.role.name === "admin");

        const clientsDataOct = clientsData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "10");
        const clientsDataNov = clientsData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "11");
        const clientsDataDec = clientsData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "12");

        const ownersDataOct = ownersData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "10");
        const ownersDataNov = ownersData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "11");
        const ownersDataDec = ownersData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "12");

        const adminsDataOct = adminsData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "10");
        const adminsDataNov = adminsData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "11");
        const adminsDataDec = adminsData.filter((user) => new Date(user.createdAt).toLocaleDateString().split('/')[1] == "12");

        return {
            Clientes: [clientsDataOct.length, clientsDataNov.length, clientsDataDec.length],
            Administradores: [adminsDataOct.length, adminsDataNov.length, adminsDataDec.length],
            Propietarios: [ownersDataOct.length, ownersDataNov.length, ownersDataDec.length]
        }
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

        const houseDataOct = houseData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "10");
        const houseDataNov = houseData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "11");
        const houseDataDec = houseData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "12");

        const departmentDataOct = deparmentData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "10");
        const departmentDataNov = deparmentData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "11");
        const departmentDataDec = deparmentData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "12");

        const roomDataOct = roomData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "10");
        const roomDataNov = roomData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "11");
        const roomDataDec = roomData.filter((property) => new Date(property.createdAt).toLocaleDateString().split('/')[1] == "12");

        return {
            Cuartos: [roomDataOct.length, roomDataNov.length, roomDataDec.length],
            Departamentos: [departmentDataOct.length, departmentDataNov.length, departmentDataDec.length],
            Casas: [houseDataOct.length, houseDataNov.length, houseDataDec.length]
        }
    }

    const userSeries = [usersData?.Clientes, usersData?.Administradores, usersData?.Propietarios];
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
    }, {
        name: 'Clientes',
        data: [0, 0, 0, 0, 0, usersDataByMonth?.Clientes[0], usersDataByMonth?.Clientes[1], usersDataByMonth?.Clientes[2]]
    }, {
        name: 'Propietarios',
        data: [0, 0, 0, 0, 0, usersDataByMonth?.Propietarios[0], usersDataByMonth?.Propietarios[1], usersDataByMonth?.Propietarios[2]]
    }, {
        name: 'Administradores',
        data: [0, 0, 0, 0, 0, usersDataByMonth?.Administradores[0], usersDataByMonth?.Administradores[1], usersDataByMonth?.Administradores[2]]
    }
    ]

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Flex vertical >
            <Flex style={{ margin: 20, marginTop: 20 }} justify="space-between" >
                <Card hoverable style={{ width: '49%', height: '80vh' }}>
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
                <Card hoverable style={{ width: '49%', height: '80vh' }}>
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
            <Flex style={{marginInline: 20, marginBottom: 20}} justify="end" >
                <Card hoverable style={{ width: '100%', height: '80vh' }} >
                    <Chart
                        options={{
                            title: {
                                text: "Registro de Propiedades y Usuarios por Mes",
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
                                opacity: 1,
                                colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#87CEEB"]
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
        </Flex>
    );
}