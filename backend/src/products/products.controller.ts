import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Get all category (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.productsService.getAll();
  }

  // Get single category by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productsService.findById(+id);
  }

  // Create category (open - for demo)
  @Post()
  async create(@Body() body: { type_samsung: string; type_iphone: string; type_vivo: string}) {
    return this.productsService.createProducts(body.type_samsung, body.type_iphone, body.type_vivo);
  }

  // Update category (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.updateProducts(+id, body);
  }

  // Delete category (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.deleteProducts(+id);
  }
}