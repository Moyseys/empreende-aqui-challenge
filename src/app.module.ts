import { Module } from '@nestjs/common';
import UserModule from './modules/user.module';
import AccountModel from './modules/account.module';
import PaymentModule from './modules/payment.module';
@Module({
  imports: [UserModule, AccountModel, PaymentModule],
})
export class AppModule {}
