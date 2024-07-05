import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import AbstractImagePaymentRepository from '../AbstractImagePaymentRepository';

@Injectable()
export default class ImagePaymentRepository extends AbstractImagePaymentRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async register(url: string, paymentId: number, fileName: string){
    try {
      const imagesPayments = await this.prisma.imagesPayments.create({
        data: {
          url,
          fileName,
          paymentId
        }
      });

      return imagesPayments
    } catch (error) {
      throw error
    }
  }
}
