/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { IdentityService } from './identity.service';
import { Module } from '@nestjs/common';
import { IndentityController } from './indentity.controller';
import { PrismaService } from '../prisma.service';
import { IdentityRepository } from './identity.repository';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notification_service_queue',
        },
      },
    ]),
  ],
  controllers: [IndentityController],
  providers: [PrismaService, IdentityRepository, IdentityService],
})
export class IdentityModule {}
