import { Injectable } from '@nestjs/common';
import AbstractPaymentRepository from '../repositories/AbstractPaymentRepository';
import AbstractAccountRepository from 'src/repositories/AbstractAccountRepository';


@Injectable()
export default class PaymentService{
  constructor(
    private readonly paymentRepository: AbstractPaymentRepository,
    private readonly accountRepository: AbstractAccountRepository
  ) { }
  
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
      const accountDestiny = await this.accountRepository.findById(idDestiny);    
      if (!accountDestiny) {
        const error = {
          message: "There is no account with this id (destination)",
          error: "Invalid account",
          statusCode: 400
        };
        throw error;
      }

      const accountOrigin = await this.accountRepository.findById(idOrigin);
      if (!accountOrigin) {
        const error = {
          message: "There is no account with this id (origin)",
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
          message: `The user with id ${idOrigin} don't have enough balance to register this payment`,
          error: "Invalid balance",
          statusCode: 400
        };
        throw error;
      }

      await this.accountRepository.updateBalance(idDestiny, accountDestinyNewBalance)
      await this.accountRepository.updateBalance(idOrigin, accountOriginNewBalance)

      const payment = await this.paymentRepository.register(
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
}