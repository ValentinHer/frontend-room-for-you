import { message } from "antd";
import { CreateUser, LoginUser } from "types/user-types";

export const createUser = async (user: CreateUser) => {
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

        return {success: true, message: 'Usuario creado exitosamente'};
    } catch (error) {
        return {success: false, message: error.message};
    }
}

export const loginUser = async (user: LoginUser) => {
    try {
        const response = await fetch("https://clever-kindness-production.up.railway.app/api/auth/login", {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
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