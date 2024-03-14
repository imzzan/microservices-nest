import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://rabbit-server:5672'],
    queue: 'product_service_queue',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
