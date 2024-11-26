export type SignUpUser = {
    firstname: string;
    lastname: string;
    numberPhone: string;
    gender: string;
    role: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type LoginUser = {
    email: string;
    password: string;
}

export type CreateUser = {
    firstname: string;
    lastname: string;
    numberPhone: string;
    gender: string;
    role: string;
    email: string;
    password: string;
}

export type userId = {
    userId: string;
} 

export type dataLogin = {
    userId: string;
    rol: string;
} 