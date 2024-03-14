/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateProduct, UpdateProduct } from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductRepository {

    constructor(private readonly prisma: PrismaService){}

    create(payload: CreateProduct) {
        return this.prisma.product.create({
            data: payload
        })
    }

    findAll() {
        return this.prisma.product.findMany()
    }

    findById(id: string) {
        return this.prisma.product.findFirst({
            where: {id}
        })
    }

    update(id: string, payload: UpdateProduct) {
        return this.prisma.product.update({
            where: {id},
            data: payload
        })
    }

    delete(id: string) {
        return this.prisma.product.delete({
            where: {id}
        })
    }
}
