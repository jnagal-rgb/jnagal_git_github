import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { SuppliersModule as Example } from './suppliers.module';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/jwt-strategy';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret',
      signOptions: {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '900s') as any,
      },
    }),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService, JwtStrategy],
  exports: [SuppliersService],
})
export class SuppliersModule {}