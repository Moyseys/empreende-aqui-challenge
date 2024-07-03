import { Module } from '@nestjs/common';
import PaymentsController from 'src/controllers/Payments.controller';
import { PrismaService } from 'src/database/prisma.service';
import PaymentRepository from 'src/repositories/PaymentRepository';
import PrismaPaymentRepository from 'src/repositories/implementation/PrismaPaymentRepository';

@Module({
  controllers: [
    PaymentsController
  ],
  providers: [
    PrismaService,
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository
    }
  ]
})

export default class PaymentModule{}