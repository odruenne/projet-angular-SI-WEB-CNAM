import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KibblesModule } from './kibbles/kibbles.module';

@Module({
  imports: [AuthModule, UsersModule, KibblesModule]
})

export class AppModule {}