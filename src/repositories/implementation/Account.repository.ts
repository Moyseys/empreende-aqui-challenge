import { PrismaService } from 'src/database/prisma.service';
import AbstractAccountRepository from '../AbstractAccountRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends  AbstractAccountRepository{
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async register(name: string, userId: number, type: 'CURRENT' | 'SAVINGS', balance: number): Promise<{ id: number; name: string; userId: number; type: string; balance: number; createdAt: Date; updatedAt: Date; }> {
    try {
      const createdAccount = await this.prisma.account.create({
        data: {
          name: name,
          userId: userId,
          type: type,
          balance: balance
        }
      });

      return createdAccount
    } catch (error) {
      throw error
    }
  }

  async findById(id: number){
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          id: id
        }
      })  

      return account
    } catch (error) {    
      throw new Error("An error occurred when checking whether the account exists")
    }
  }

  async updateBalance(id: number, newBalance: number): Promise<boolean> {
    try {
      await this.prisma.account.update({
        where: { id },
        data: { balance: newBalance },
      });

      return true
    } catch (error) {
      throw new Error(`Failed to update balance: ${error.message}`);
    }
  }
}
