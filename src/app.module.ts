import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule { }
