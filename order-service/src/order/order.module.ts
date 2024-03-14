/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { PrismaService } from 'src/prisma.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, PrismaService],
})
export class OrderModule {}
