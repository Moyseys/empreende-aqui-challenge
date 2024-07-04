import { Injectable } from '@nestjs/common';
import AbstractAccountRepository from 'src/repositories/AbstractAccountRepository';
import AbstractUserRepository from 'src/repositories/AbstractUserRepository';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AbstractAccountRepository,
    private readonly userRepository: AbstractUserRepository
  ) { }

  async createAccount(name: string, userId: number, type: 'CURRENT' | 'SAVINGS', balance: number): Promise<{ id: number; name: string; userId: number; type: string; balance: number; createdAt: Date; updatedAt: Date; }> {
    try {
      const existUser = await this.userRepository.findById(userId)
      if (!existUser) {
        const error = {
          message: "There not is an user whith this id",
          error: "Invalid user",
          statusCode: 400
        }     
        
        throw error
      }

      const createdAccount = await this.accountRepository.register(
        name,
        userId,
        type,
        balance
      )

      return createdAccount
    } catch (error) {
      throw error
    }
  }
}
