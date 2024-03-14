/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderRepository {

    constructor(private readonly prisma : PrismaService){}

    create(payload: CreateOrderDto) {
        return this.prisma.order.create({
            data: payload
        })
    }

    findAll() {
        return this.prisma.order.findMany()
    }

    findById(id: string) {
        return this.prisma.order.findUnique({
            where: {id}
        })
    }

    update(id: string, payload: UpdateOrderDto) {
        return this.prisma.order.update({
            where: {id},
            data: payload
        })
    }

    delete(id: string) {
        return this.prisma.order.delete({
            where: {id}
        })
    }

}
