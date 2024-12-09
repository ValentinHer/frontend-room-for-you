import { TCreateUser, TLoginUser } from "types/user";
import { createOwer } from "./owner-hook";
import { createClient } from "./client-hook";

export const createUser = async (user: TCreateUser) => {
    try {
        const response = await fetch("https://clever-kindness-production.up.railway.app/api/users", {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify(user)
        })

        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Ocurrió un error, intentelo de nuevo");
        }

        const result = await response.json();
        const userId = {
            userId: result.id
        }

        if(result.role.name === "propietario"){
            const createOwnerByUserId = await createOwer(userId);
        }

        if(result.role.name === "cliente"){
            const createClientByUserId = await createClient(userId);
        }

        return {success: true, message: 'Usuario creado exitosamente'};
    } catch (error) {
        return {success: false, message: error.message};
    }
}

export const loginUser = async (user: TLoginUser) => {
    try {
        const response = await fetch("https://clever-kindness-production.up.railway.app/api/auth/login", {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user)
        })

        if(!response.ok) {
            const error =  await response.json();
            throw new Error(error.message || "Ocurrió un error, intentelo de nuevo");
        }

        const result = await response.json();
        return {data: result, success: true, message: "Redirigiendo..."}
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export const logoutUser = async () => {
    const response = await fetch("https://clever-kindness-production.up.railway.app/api/auth/logout", {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        credentials: 'include'
    })

    const result = await response.json();
    return {success: true, message: result.message ? "Sesión Finalizada" : "Error al salir"};
}

export const getUserById = async (userId: string) => {
    const result = await fetch(`https://clever-kindness-production.up.railway.app/api/users/${userId}`, {
        method: 'GET',
        credentials: 'include'
    })

    return await result.json();
}

export const getAllUsers = async (page: number = 1, limit: number = 10) => {
    
    const result = await fetch(`https://clever-kindness-production.up.railway.app/api/users?page=${page}&limit=${limit}`, {
        method: 'GET',
        credentials: 'include'
    })

    return await result.json();
}