/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Inject, Post, Req, UseGuards, UseInterceptors, Get, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProduct, UpdateProduct } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { UserRequest } from 'src/inetrface/user';
import { requestParams } from 'src/inetrface/params';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(@Inject("PRODUCT_SERVICE") private readonly client: ClientProxy){}
    
    @UseInterceptors(UserInterceptor)
    @Post('/')
    createProduct(@Body() product: CreateProduct, @Req() req: UserRequest) {
        const user = req.user
        console.log(user);
        return this.client.send('createProduct', {user, product})
    }

    @Get('/')
    getProduct() {
        return this.client.send('getAllProduct', {})
    }

    @Get(':id')
    getProductById(@Req() req: requestParams) {
        const {id} = req.params
        return this.client.send('detailProduct', id)
    }

    @Put(":id")
    updateProduct(@Req() req: requestParams, @Body() product: UpdateProduct) {
        const {id} = req.params
        return this.client.send('updateProduct', {id, product})
    }

    @Delete(":id")
    deleteProduct(@Req() req: requestParams) {
        const {id} = req.params
        return this.client.send('deleteProduct', id)
    }
}
