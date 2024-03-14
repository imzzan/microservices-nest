/* eslint-disable prettier/prettier */
export class CreateOrderDto {
    idBarang: string;
    nameBarang: string
    price: number;
    idUser: string
    name: string
    email: string
}

export class UserDto {
    id: string
    name: string
    email: string
    iat: string
}