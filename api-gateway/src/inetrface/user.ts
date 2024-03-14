/* eslint-disable prettier/prettier */
import { Request } from 'express';
export interface UserRequest extends Request {
    user?: {
        id: string,
        name: string,
        email: string,
        iat: number
    },
    token?: string
}