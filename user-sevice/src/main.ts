import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microservicesOption: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://rabbit-server:5672'],
    queue: 'user_service_queue',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microservicesOption,
  );
  await app.listen();
}
bootstrap();
