import { TRoleData } from "./role";

export type TSignUpUser = {
    firstname: string;
    lastname: string;
    numberPhone: string;
    gender: string;
    role: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type TLoginUser = {
    email: string;
    password: string;
}

export type TCreateUser = {
    firstname: string;
    lastname: string;
    numberPhone: string;
    gender: string;
    role: string;
    email: string;
    password: string;
}

export type TUserId = {
    userId: string;
} 

export type TDataUser = {
    id: string; 
    firstname: string; 
    lastname: string; 
    numberPhone: string; 
    email: string; 
    password: string; 
    gender: string; 
    createdAt: string; 
    updatedAt: string; 
    role: TRoleData;
}