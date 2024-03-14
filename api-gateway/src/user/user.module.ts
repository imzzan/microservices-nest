/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL],
          queue: 'user_service_queue',
        },
      }
    ]),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
