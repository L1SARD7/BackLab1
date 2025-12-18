export interface User {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Record {
    id: string;
    user_id: string;
    category_id: string;
    timestamp: string;
    amount: number;
}
