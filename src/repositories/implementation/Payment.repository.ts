import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import AbstractPaymentRepository from '../AbstractPaymentRepository';


@Injectable()
export default class PaymentRepository extends AbstractPaymentRepository{
  constructor(private readonly prisma: PrismaService) { 
    super()
  }
  
  async register(idDestiny: number, idOrigin: number, value: number, description: string): Promise<{
    id: number;
    value: number;
    description: string;
    accountIdOrigin: number;
    accountIdDestiny: number;
    createdAt: Date;
    updatedAt: Date;
  }> {
    try {
      const payment = await this.prisma.payments.create({
        data: {
          accountIdDestiny: idDestiny,
          accountIdOrigin: idOrigin,
          value: value,
          description: description,
        }
      })

      return payment
      
    } catch (error) {
      throw error
    }
  }

  async findById(id: number) {
    try {
      const payments = await this.prisma.payments.findUnique({
        where: {
          id: id
        }
      })  

      return payments
    } catch (error) {
      throw error
    }
  }
}