/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Inject, Post, Req, UseGuards, UseInterceptors, Get, Put, Delete} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRequest } from 'src/inetrface/user';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { CreateOrder, UpdateOrderDto } from './dto';
import { requestParams } from 'src/inetrface/params';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {

    constructor(@Inject("ORDER_SERVICE") private readonly client: ClientProxy){}
    
    @UseInterceptors(UserInterceptor)
    @Post('/')
    create(@Req() req: UserRequest, @Body() payload: CreateOrder) {
        const user = req?.user
        const token = req?.token
        const productId =  payload.productId
        return this.client.send("createOrder", {productId, user, token})
    }
    
    @Get('/')
    getOrder() {
        return this.client.send('getOrder', {})
    }

    @Get(':id')
    getOrderById(@Req() req: requestParams) {
        const {id} = req.params
        return this.client.send('detailOrder', id)
    }

    @Put(':id')
    updateOrder(@Req() req: requestParams, @Body() order: UpdateOrderDto) {
        const {id} = req.params
        return this.client.send('updateOrder', {id, order})
    }

    @Delete(':id')
    deleteOrder(@Req() req: requestParams) {
        const {id} = req.params
        return this.client.send('deleteOrder', id)
    }
}