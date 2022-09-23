import { JwtAuthGuard, RmqService } from '@app/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotiService } from './noti.service';

@Controller()
export class NotiController {
  constructor(
    private readonly notiService: NotiService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.notiService.getHello();
  }

  @EventPattern('bill_created')
  // @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('ser noti data: ', data);
    this.notiService.generate(data);
    this.rmqService.ack(context);
  }
}
