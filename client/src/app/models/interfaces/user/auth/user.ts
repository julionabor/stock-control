export interface User {
}
export interface SignupUserRequest{
    name: string;
    email: string;
    password: string;
}
export interface SignupUserResponse{
    id: string,
    name: string;
    email: string;
}