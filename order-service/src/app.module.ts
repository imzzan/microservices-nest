import { OrderModule } from './order/order.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
