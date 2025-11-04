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