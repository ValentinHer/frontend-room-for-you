import { TCreateProperty } from "types/property"

export const createProperty = async (property: TCreateProperty) => {
    try {
        const response = await fetch("https://clever-kindness-production.up.railway.app/api/properties", {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(property)
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || "Ha ocurrido un error al guardar");
        }

        const result = await response.json();

        return {data: result, success: true, message: "Se ha guardado correctamente"};
    } catch (error) {
        return {success: false, message: error.message};
    }
}

export const getProperties = async (page: number = 1, limit: number = 10) => {
    const response = await fetch(`https://clever-kindness-production.up.railway.app/api/properties?page=${page}&limit=${limit}`, {
        method: "GET",
        credentials: "include"
    })

    return await response.json();
}

export const getPropertiesByOwner = async (ownerId:string, page: number = 1, limit: number = 10) => {
    const response = await fetch(`https://clever-kindness-production.up.railway.app/api/properties/by-owner/${ownerId}?page=${page}&limit=${limit}`, {
        method: 'GET',
        credentials: 'include'
    })

    return await response.json(); 
}

export const getPropertyById = async (propertyId: string) => {
    const response = await fetch(`https://clever-kindness-production.up.railway.app/api/properties/${propertyId}`, {
        method: "GET",
        credentials: 'include'
    })

    return await response.json();
}