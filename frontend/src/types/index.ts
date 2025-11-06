import {MouseEventHandler} from "react";

export interface BackEndResponse {
    error?: string;
}

export interface FaqDataStructure {
    question: string;
    answer: string;
}

export interface CartItemPayload {
    id: string;
    name: string;
    price: string;
    picture: string;
}

export interface CartItem extends CartItemPayload {
    quantity: number;
}

export interface LoginRequestStructure {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterRequestStructure extends LoginRequestStructure {
    userName: string;
}

export interface AuthBackendResponseStructure extends AuthUserState {
    access_token: string;
    refresh_token: string;
}

export interface AuthUserState {
    id: string;
    userName: string;
    email: string;
    created_at: string;
}

export interface HeaderItemProps {
    text: string;
    link: string;
    functionName?: MouseEventHandler;
    className?: string;
}