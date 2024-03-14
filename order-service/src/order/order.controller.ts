/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { UserDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller()
export class OrderController {

    constructor(private readonly orderService: OrderService){}

    @MessagePattern('createOrder')
    async create(@Payload() payload: {productId: string, user: UserDto, token: string}) {
        try {
            const response = await this.orderService.create(payload.productId, payload.user, payload.token)
            return {
                code: 201,
                status: "OK",
                message: "Success",
                data: response
            }
        } catch (error) {
            return error.response
        }
    }

    @MessagePattern('getOrder')
    async getAllOrders() {
        try {
            const response = await this.orderService.findAll()
            return {
                code: 200,
                status: "OK",
                message: "Success",
                data: response
            }
        } catch (error) {
            return error.response
        }
    }

    @MessagePattern('detailOrder')
    async detailOrder(@Payload() id: string) {
        try {
            const response = await this.orderService.findById(id)
            return {
                code: 201,
                status: "OK",
                message: "Success",
                data: response
            }
        } catch (error) {
            return error.response
        }
    }

    @MessagePattern('updateOrder')
    async updateOrder(@Payload() payload: {id: string, order: UpdateOrderDto}) {
        try {
            const response = await this.orderService.updateOrder(payload.id, payload.order)
            return {
                code: 201,
                status: "OK",
                message: "Success",
                data: response
            }
        } catch (error) {
            return error.response
        }
    }

    @MessagePattern('deleteOrder')
    async deleteOrder(@Payload() id: string) {
        try {
            await this.orderService.deleteOrder(id)
            return {
                status: "OK",
                message: "Success deleted"
            }
        } catch (error) {
            return error.response
        }
    }
}
