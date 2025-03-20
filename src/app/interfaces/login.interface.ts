export interface ILoginPayload {
    username: string;
    password: string;
}

export interface ILoginResponse {
    message: string;
    statusCode: number;
    token: string;
}