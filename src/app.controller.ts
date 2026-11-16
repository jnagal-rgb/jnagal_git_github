import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'API is running', status: 'ok' };
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}