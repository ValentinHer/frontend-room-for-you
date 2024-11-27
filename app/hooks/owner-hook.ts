import { userId } from "types/user-types";

export const createOwer = async (user: userId) => {
    const response = await fetch("https://clever-kindness-production.up.railway.app/api/owners", {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(user)
    })

    return await response.json();
}

export const getOwnerByUser = async (userId: string) => {
    const response = await fetch(`https://clever-kindness-production.up.railway.app/api/owners/by-user/${userId}`, {
        method: 'GET',
        credentials: 'include',
    })

    return await response.json();
}