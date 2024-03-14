import { EventsModule } from './events/events.module';
import { MessageModule } from './message/message.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventsModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
