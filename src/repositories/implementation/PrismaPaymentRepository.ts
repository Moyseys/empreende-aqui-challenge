import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import PaymentRepository from '../PaymentRepository';


@Injectable()
export default class PrismaPaymentRepository extends PaymentRepository{
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
      const accountDestinyExist = await this.accountExist(idDestiny);
      if (!accountDestinyExist) {
        const error = {
          message: "There is no account with this id (destination)",
          error: "Invalid account",
          statusCode: 400
        };
        throw error;
      }

      const accountOriginExist = await this.accountExist(idOrigin);
      if (!accountOriginExist) {
        const error = {
          message: "There is no account with this id (origin)",
          error: "Invalid account",
          statusCode: 400
        };
        throw error;
      }

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

  protected async accountExist(id: number): Promise<boolean> {
    try {
      const accountExit = await this.prisma.account.findUnique({
        where: {
          id: id
        }
      })  

      return !!accountExit
    } catch (error) {    
      throw new Error("An error occurred when checking whether the account exists")
    }
  }
}