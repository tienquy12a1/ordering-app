import { JwtAuthGuard } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async createOrder(@Req() req: any) {
  //   console.log('ser orders haha');
  //   return this.ordersService.createOrder(request, req.cookies?.Authentication);
  // }

  @Post()
  async createOrder(
    @Body(new ValidationPipe({ transform: true })) request: CreateOrderRequest,
    @Req() req: any,
  ) {
    console.log('ser orders request: ', request);
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }
  @Get()
  async getOrders() {
    console.log('TEST-123-456');
    return this.ordersService.getOrders();
  }
}
