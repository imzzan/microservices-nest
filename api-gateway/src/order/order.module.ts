/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name : "ORDER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL],
          queue: 'order_service_queue',
        },  
      },
      {
        name : "USER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL],
          queue: 'user_service_queue',
        },
      }
    ])
  ],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
