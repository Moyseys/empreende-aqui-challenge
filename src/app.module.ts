import { Module } from '@nestjs/common';
import UserModule from './modules/user.module';
import AccountModel from './modules/account.module';
@Module({
  imports: [UserModule, AccountModel],
})
export class AppModule {}
