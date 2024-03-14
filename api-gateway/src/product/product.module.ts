/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
        {
          name : "PRODUCT_SERVICE",
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_URL],
            queue: 'product_service_queue',
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
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
