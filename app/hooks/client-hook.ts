import { TUserId } from "types/user";

export const createClient = async (user: TUserId) => {
    const response = await fetch("https://clever-kindness-production.up.railway.app/api/clients", {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(user)
    })

    return await response.json();
}

export const getClient = async (userId: string) => {
    const response = await fetch(`https://clever-kindness-production.up.railway.app/api/clients/by-user/${userId}`, {
        method: "GET",
        credentials: 'include'
    })

    return await response.json();
}