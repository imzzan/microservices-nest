/* eslint-disable prettier/prettier */
import { Request } from "express"

export interface requestParams extends Request {
    params: {
        id?: string
    }
}