/* eslint-disable prettier/prettier */
export class CreateProduct {
    name: string;
    price: number;
    image: string;
    userId: string
  }

export class UpdateProduct {
  name: string;
  price: number;
  image: string;
  userId: string
}

export interface UserInterface {
  id: string,
  name: string,
  email: string,
  iat: number
}