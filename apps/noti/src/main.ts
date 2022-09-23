import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { NotiModule } from './noti.module';

async function bootstrap() {
  console.log('Ser noti');
  const app = await NestFactory.create(NotiModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('NOTI'));
  await app.startAllMicroservices();
}
bootstrap();
