'use client'

import { Avatar, Button, Card, Flex, Image as Img } from "antd";
import { getFiles } from "hooks/file-hooks";
import { getPropertyById } from "hooks/property-hook";
import { use, useEffect, useState } from "react";
import { TDataProperty } from "types/property";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import PropertyPage from "ui/property-page";
import { getOwnerById } from "hooks/owner-hook";
import MapByAddress from "ui/map-by-address";
import { TDataUser } from "types/user";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsInPromise = use(params);
    const [data, setData] = useState<TDataProperty | null>(null);
    const [loading, setLoading] = useState(false);
    const [ownerName, setOwnerName] = useState('');
    const [ownerData, setOwnerData] = useState<TDataUser | null>(null);
    const [urlEdited, setUrlsEdited] = useState<string[] | null>(null);

    const { id } = paramsInPromise;

    const getPropertyData = async () => {
        setLoading(true);
        const getProperty = await getPropertyById(id);
        const { owner, ...otherData } = getProperty;
        const getOwner = await getOwnerById(owner.id);
        const ownername = `${getOwner.user?.firstname} ${getOwner.user?.lastname}`.toUpperCase();
        const { user } = getOwner;
        setOwnerData(user);

        const getFiles = await getFilesToProperty(otherData);
        const numberImages: string[] = Array.isArray(getFiles?.url) && getFiles?.url.length > 0 ? getFiles?.url.splice(1) : [];
        setOwnerName(ownername);
        setData(getFiles);
        setUrlsEdited(numberImages);
        setLoading(false);
    }

    const getFilesToProperty = async (data: TDataProperty) => {
        console.log(data);
        const id = data.id;
        const result = await getFiles(id);
        const dataModificate = { ...data, url: result };
        return dataModificate;
    }

    useEffect(() => {
        getPropertyData();
    }, [])

    return (
        <Flex style={{ padding: 20 }} justify="center" >
            {loading ? < PropertyPage /> :
                <Flex style={{ width: '85%' }} vertical >
                    <Flex justify="start" style={{ padding: 2 }} >
                        <h1>{data?.title}</h1>
                    </Flex>
                    <Flex wrap style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }} justify="center" >
                        {Array.isArray(data?.url) && data?.url.length > 0 ?
                            (<Img.PreviewGroup>
                                <Flex style={{ width: '50%', height: '61.5vh' }}>
                                    <Img style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="imagen1" src={data?.url[0]} />
                                </Flex>
                                <Flex wrap style={{ width: '50%', height: '60vh' }} >
                                    {urlEdited?.map((image) => (
                                        <Flex key={urlEdited?.indexOf(image)} style={{ width: '50%', height: '30vh', overflow: 'hidden', paddingLeft: 10, marginBottom: 10 }} >
                                            <Img style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="imagen1" src={image} />
                                        </Flex>
                                    ))}
                                </Flex>
                            </Img.PreviewGroup>) :
                            <h2>No hay Imágenes Disponibles</h2>
                        }
                    </Flex>
                    <Flex style={{ width: '100%' }} justify="space-between">
                        <Flex vertical style={{ width: '75%' }} >
                            <Flex vertical style={{ width: '100%', backgroundColor: '#c5eaff', padding: 10, borderRadius: 10, marginBlock: 10 }} >
                                <Flex>
                                    <Avatar size={'large'} icon={<UserOutlined />} style={{ marginRight: 10 }} />
                                    <h2 >ANFITRIÓN: {ownerName}</h2>
                                </Flex>
                                <Flex>
                                    <h3>Contacto: <PhoneOutlined /> {ownerData?.numberPhone}</h3> 
                                </Flex>
                            </Flex>
                            <Flex vertical style={{ width: '100%', backgroundColor: '#c5eaff', padding: 10, borderRadius: 10, marginBottom: 10 }} >
                                <h3 style={{ marginBottom: 0 }} >Descripción:</h3>
                                <p>{data?.description}</p>
                            </Flex>
                            <Flex vertical style={{ width: '100%', backgroundColor: '#c5eaff', padding: 10, borderRadius: 10, marginBottom: 10 }} >
                                <h3 style={{ marginBottom: 0 }}>Características:</h3>
                                <p >{data?.features}</p>
                            </Flex>
                        </Flex>
                        <Card style={{ width: '20%', marginBlock: 10, backgroundColor: '#011222', color: 'white' }} >
                            <p style={{ backgroundColor: '#ff8616', padding: 10, borderRadius: 20, marginTop: 0 }} ><b>Precio:</b> ${data?.price} MXN</p>
                            <p style={{ margin: 0 }} ><h3 style={{ margin: 0 }} >Dirección: </h3> {data?.address}</p>
                            <p style={{ margin: 0 }} ><h3 style={{ margin: 0 }} >Transacción mediante: </h3> {data?.transactionType}</p>
                            <p style={{ margin: 0 }} ><h3 style={{ margin: 0 }} >Tipo: </h3> {data?.type}</p>
                        </Card>
                    </Flex>
                    <Flex style={{ width: '100%' }}>
                        {data?.address ? (<MapByAddress address={data.address} />): (<h2>Mapa No Disponible</h2>)}
                    </Flex>
                </Flex>
            }
        </Flex>
    );
}