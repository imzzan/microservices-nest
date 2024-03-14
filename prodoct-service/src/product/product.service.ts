/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProduct, UpdateProduct } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {

    constructor(
        private readonly productRepo: ProductRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        ){}

    async create(payload: CreateProduct) {
        const product = await this.productRepo.create(payload)
        return product
    }

    async findAll() {
        try {
            const cacheProduct = await this.cacheManager.store.get('mzuna')
            if (cacheProduct) {
                console.log("From cache");
                return cacheProduct
            }
            const product = await this.productRepo.findAll()
            await this.cacheManager.store.set('mzuna', product)
            console.log("from api")
            return product
        } catch (error) {
            console.log(error);
        }
    }

    async findById(id: string) {
        const product = await this.productRepo.findById(id)
        if (!product) {
            throw new NotFoundException()
        }

        return product
    }

    async update(id: string, payload: UpdateProduct) {
        const product = await this.productRepo.findById(id)
        if (!product) {
            throw new NotFoundException()
        }

        const newProduct = await this.productRepo.update(id, payload)
        return newProduct
    }

    async delete(id: string) {
        const oldproduct = await this.productRepo.findById(id)
        if (!oldproduct) {
            throw new NotFoundException()
        }

       const product =  await this.productRepo.delete(id)
       return product
    }
}
