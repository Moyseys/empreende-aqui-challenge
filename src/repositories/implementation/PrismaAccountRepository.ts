import { PrismaService } from 'src/database/prisma.service';
import AccountRepository from '../AccountRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAccountRepository extends AccountRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async register(name: string, userId: number, type: 'CURRENT' | 'SAVINGS', balance: number): Promise<{ id: number; name: string; userId: number; type: string; balance: number; createdAt: Date; updatedAt: Date; }> {
    try {
      const existUser = await this.userExists(userId)
      if (!existUser) {
        const error = {
          message: "There not is an user whith this id",
          error: "Invalid user",
          statusCode: 400
        }     
        
        throw error
      }

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

  protected async userExists(id: number): Promise<boolean> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: id
        }
      })  

      return !!user
    } catch (error) {    
      throw new Error("An error occurred when checking whether the user exists")
    }
  }
}
