import { Module } from '@nestjs/common';
import PaymentsController from 'src/controllers/Payments.controller';
import { PrismaService } from 'src/database/prisma.service';
import AbstractPaymentRepository from 'src/repositories/AbstractPaymentRepository';
import PaymentRepository from 'src/repositories/implementation/Payment.repository';
import PaymentService from 'src/services/Payment.service';
import AccountModel from './account.module';
import AbstractAccountRepository from 'src/repositories/AbstractAccountRepository';
import { AccountRepository } from 'src/repositories/implementation/Account.repository';

@Module({
  imports: [
    AccountModel
  ],
  controllers: [
    PaymentsController
  ],
  providers: [
    PaymentService,
    {
      provide: AbstractAccountRepository,
      useClass: AccountRepository
    },
    {
      provide: AbstractPaymentRepository,
      useClass: PaymentRepository
    },
    PrismaService
  ],
})

export default class PaymentModule{}