/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProduct, UpdateProduct, UserInterface } from './dto/index';

@Controller()
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @MessagePattern('createProduct')
    async create(@Payload() payload: {user: UserInterface, product: CreateProduct}) {
        try {
            const userId: string = payload.user.id
            payload.product.userId = userId
            const response = await this.productService.create(payload.product)
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

    @MessagePattern('getAllProduct')
    async findall() {
        try {
            
            const response = await this.productService.findAll()
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

    @MessagePattern('detailProduct')
    async findById(@Payload() id: string) {
        try {
            const response = await this.productService.findById(id)
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

    @MessagePattern('updateProduct')
    async update(@Payload() payload: {id: string, product: UpdateProduct}) {
        try {
            const response = await this.productService.update(payload.id, payload.product)
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

    @MessagePattern('deleteProduct')
    async delete(@Payload() id: string) {
        try {
            await this.productService.delete(id)
            return {
                code: 200,
                status: "OK",
                message: "Product deleted successfully"
            }
        } catch (error) {
            return error.response
        }
    }
}
