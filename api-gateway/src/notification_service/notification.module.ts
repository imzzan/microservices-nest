/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
        {
            name : "NOTIFICATION_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rabbit-server:5672'],
              queue: 'notification_service_queue',
            },
          },
    ])
  ],
  controllers: [NotificationController],
  providers: [],
})
export class NotificationModule {}
