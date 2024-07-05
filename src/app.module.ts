import { Module } from '@nestjs/common';
import UserModule from './modules/user.module';
import AccountModel from './modules/account.module';
import PaymentModule from './modules/payment.module';
import AuthModule from './modules/auth.module';
import ImagePaymentController from './controllers/ImagePayment.controller';
import ImagePaymentModule from './modules/imagePayment.module';
@Module({
  imports: [
    UserModule,
    AccountModel,
    PaymentModule,
    AuthModule,
    ImagePaymentModule
  ],
})
export class AppModule {}
