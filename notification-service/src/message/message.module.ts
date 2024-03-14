/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { EventsGateway } from 'src/events/events.gateway';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, EventsGateway],
})
export class MessageModule {}