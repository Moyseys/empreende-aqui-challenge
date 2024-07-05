import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import AbstractPaymentRepository from '../AbstractPaymentRepository';


@Injectable()
export default class PaymentRepository extends AbstractPaymentRepository{
  constructor(private readonly prisma: PrismaService) { 
    super()
  }
  
  async register(userId: number, idDestiny: number, idOrigin: number, value: number, description: string){
    try {
      const payment = await this.prisma.payments.create({
        data: {
          userId: userId,
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

  async report(userId: number, startDate: Date, finalDate: Date){
    try {
      const payments = await this.prisma.payments.findMany({
        where: {
          userId: userId,
          createdAt: {
            gte: startDate,
            lte: finalDate
          }
        }
      })  

      return payments
    } catch (error) {
      throw error
    }
  }
  
}