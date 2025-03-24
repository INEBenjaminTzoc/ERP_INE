export interface IUser {
    id: number;
    username: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    status: boolean;
    user: IUser;
}