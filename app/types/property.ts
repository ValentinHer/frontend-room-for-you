export type TCreateProperty = {
    ownerId: string;
    title: string;
    type: string;
    address: string;
    transactionType: string;
    price: number;
    description: string;
    features: string;
    state: string;
}

export type TDataProperty = {
    id: string;
    title: string;
    type: string;
    address: string;
    transactionType: string;
    price: number;
    description: string;
    features: string;
    state: string;
    url: string[] | object;
    createdAt: string;
    updatedAt: string;
}

export type TDataProps = {
    id: string;
    title: string;
    type: string;
    address: string;
    transactionType: string;
    price: number;
    description: string;
    features: string;
    state: string;
    createdAt: string;
    updatedAt: string;
}