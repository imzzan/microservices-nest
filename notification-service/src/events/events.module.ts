/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [EventsGateway],
})
export class EventsModule {}
