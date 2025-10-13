export interface UserResponse {
    id: string,
    name: string,
    email: string,
    role: string
}

export default interface LoginResponse {
    success: true,
    user: UserResponse
}

export interface LoginResponseError {
    success: false,
    error: string
}

export type LoginResponseType = LoginResponse | LoginResponseError

