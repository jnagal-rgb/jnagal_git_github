import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  async findAll() {
    return this.suppliersService.getAllsuppliers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.suppliersService.getsuppliersById(+id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.suppliersService.createSuppliers(body.type_name, body.type_address);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.suppliersService.createSuppliers(body.type_name, body.type_address);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.suppliersService.deleteSuppliers(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.suppliersService.updateSuppliers(+id, body);
  }
}