/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import axios from 'axios';
import { UserDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {

    constructor(private readonly orderRepo: OrderRepository){}

    async create(id: string, user: UserDto, token: string) {

        if (!token) {
            throw new UnauthorizedException()
        }

        const product = await axios.get(`http://localhost:3000/products/${id}`, {
            headers: {
                'Authorization': 'Bearer' + " "+  token
            }
        })
        const order = await this.orderRepo.create({
            idBarang: product.data.data.id,
            nameBarang: product.data.data.name,
            price: product.data.data.price,
            idUser: user.id,
            name: user.name,
            email: user.email,

        })
        return order
    }

    async findAll() {
        try {
            const orders = await this.orderRepo.findAll()
            return orders
        } catch (error) {
            return error
        }
    }

    async findById(id: string) {
        const order = await this.orderRepo.findById(id)
        if (!order) {
            throw new NotFoundException()
        }
        return order
    }

    async updateOrder(id:string, payload: UpdateOrderDto) {
        const order = await this.orderRepo.findById(id)
        if (!order) {
            throw new NotFoundException()
        }
        const newOrder = await this.orderRepo.update(id, payload)
        return newOrder
    }

    async deleteOrder(id:string) {
        const order = await this.orderRepo.findById(id)
            if (!order) {
                throw new NotFoundException()
            }

        await this.orderRepo.delete(id)
    }
}


