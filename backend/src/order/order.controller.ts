import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderFrontendDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderDto: OrderFrontendDto) {
    return this.orderService.create(orderDto);
  }
}
