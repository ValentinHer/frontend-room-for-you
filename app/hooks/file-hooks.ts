export const uploadFile = async (formData) => {
    const response = await fetch("https://clever-kindness-production.up.railway.app/api/files/upload", {
        method: "POST",
        credentials: "include",
        body: formData
    })

    return await response.json();
}

export const getFiles = async (propertyId: string) => {
    const response = await fetch(`https://clever-kindness-production.up.railway.app/api/files${propertyId ? `/${propertyId}` : ''}`, {
        method: 'GET',
        credentials: 'include'
    })
    
    return await response.json();
}