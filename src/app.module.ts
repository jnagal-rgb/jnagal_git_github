import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
imports: [
    SuppliersModule,
    DatabaseModule,
    UsersModule,
    ProductsModule, 
    OrdersModule,  
    AuthModule],
})

export class AppModule {}