export interface User {
}
export interface SignupUserRequest{
    nome: string;
    email: string;
    password: string;
}
export interface SignupUserResponse{
    id: string,
    nome: string;
    email: string;
}