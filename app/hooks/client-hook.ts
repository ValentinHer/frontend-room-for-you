import { userId } from "types/user-types";

export const createClient = async (user: userId) => {
    const response = await fetch("https://clever-kindness-production.up.railway.app/api/clients", {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(user)
    })

    return await response.json();
}