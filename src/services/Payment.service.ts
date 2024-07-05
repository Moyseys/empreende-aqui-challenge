import { Injectable } from '@nestjs/common';
import AbstractPaymentRepository from '../repositories/AbstractPaymentRepository';
import AbstractAccountRepository from 'src/repositories/AbstractAccountRepository';


@Injectable()
export default class PaymentService{
  constructor(
    private readonly paymentRepository: AbstractPaymentRepository,
    private readonly accountRepository: AbstractAccountRepository
  ) { }
  
  async register(userId: number, idDestiny: number, idOrigin: number, value: number, description: string): Promise<{
    id: number;
    value: number;
    description: string;
    accountIdOrigin: number;
    accountIdDestiny: number;
    createdAt: Date;
    updatedAt: Date;
  }> {
    try {
      if (idDestiny === idOrigin) {
        const error = {
          message: "The destination account may not be the same as the logged in user",
          error: "Invalid account",
          statusCode: 400
        };
        throw error;
      }

      const accountOrigin = await this.accountRepository.findById(idOrigin);
      if (!accountOrigin) {
        const error = {
          message: "There is no account with this id(origin)",
          error: "Invalid account",
          statusCode: 400
        };
        throw error;
      }
      if (accountOrigin.userId !== userId) {
        const error = {
          message: "The originating account must be that of the logged in user",
          error: "Invalid account origin",
          statusCode: 400
        };
        throw error;
      }

      const accountDestiny = await this.accountRepository.findById(idDestiny);    
      if (!accountDestiny) {
        const error = {
          message: "There is no account with this id (destination)",
          error: "Invalid account",
          statusCode: 400
        };
        throw error;
      }

      if (accountOrigin.type === "SAVINGS") {
        const error = {
          message: `Unable to make payment from a savings account`,
          error: "Invalid type account",
          statusCode: 400
        };
        throw error;
      }

      const accountDestinyNewBalance = accountDestiny.balance + value
      const accountOriginNewBalance = accountOrigin.balance - value
      
      if (accountOriginNewBalance < 0) {
        const error = {
          message: `The account with id ${idOrigin} don't have enough balance to register this payment`,
          error: "Invalid balance",
          statusCode: 400
        };
        throw error;
      }

      await this.accountRepository.updateBalance(idDestiny, accountDestinyNewBalance)
      await this.accountRepository.updateBalance(idOrigin, accountOriginNewBalance)

      const payment = await this.paymentRepository.register(
        userId,
        idDestiny,
        idOrigin,
        value,
        description,
      )

      return payment
    } catch (error) {
      throw error
    }
  }

  async report(userId: number, startDate: Date, finalDate: Date) {
    try {
      const payments = await this.paymentRepository.report(userId, startDate, finalDate)
      const sum = payments.reduce((ac, payment) => { 
        return ac + payment.value
      }, 0)

      return {
        payments,
        totalSum: sum
      }
    } catch (error) {
      throw error
    }
  }
}