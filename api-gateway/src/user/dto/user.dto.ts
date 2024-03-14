/* eslint-disable prettier/prettier */
export class RegisterDto {
    name: string
    email: string
    password: string
    city: string
    country: string
}


export class LoginDto {
    email: string
    password: string
}