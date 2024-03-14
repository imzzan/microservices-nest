/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { ProductRepository } from './product.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    ttl: 100000,
   })],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductRepository,{
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  }],
})
export class ProductModule {}
