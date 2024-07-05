import { Module } from '@nestjs/common';
import ImagePaymentController from 'src/controllers/ImagePayment.controller';
import { PrismaService } from 'src/database/prisma.service';
import AbstractImagePaymentRepository from 'src/repositories/AbstractImagePaymentRepository';
import AbstractPaymentRepository from 'src/repositories/AbstractPaymentRepository';
import ImagePaymentRepository from 'src/repositories/implementation/ImagePayment.repository';
import PaymentRepository from 'src/repositories/implementation/Payment.repository';
import { ImagePaymentService } from 'src/services/ImagePayment.service';


@Module({
  controllers: [
    ImagePaymentController
  ],
  providers: [
    ImagePaymentService,
    {
      provide: AbstractPaymentRepository,
      useClass: PaymentRepository
    },
    {
      provide: AbstractImagePaymentRepository,
      useClass: ImagePaymentRepository
    },
    PrismaService,
  ],
})
export default class ImagePaymentModule{}