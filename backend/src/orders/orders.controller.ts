import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return this.ordersService.getAllorders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.getordersById(+id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.ordersService.createOrders(body.orders_quality, body.orders_name);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.ordersService.createOrders(body.orders_quality, body.orders_name);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ordersService.deleteOrders(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.ordersService.updateOrders(+id, body);
  }
}