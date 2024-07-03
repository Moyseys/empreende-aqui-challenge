import { PrismaService } from 'src/database/prisma.service';
import UserRepository from '../UserRepository';
import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomBytes} from "node:crypto"


@Injectable()
export default class PrismaUserRepository implements UserRepository{
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(name: string, email: string, password: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | Msg> {
    try {
      const existEmail = await this.existEmail(email)
      if (existEmail) {
        const error = {
          message: "There is already a user with this email",
          error: "Duplicate email",
          statusCode: 400
        }     
        throw error
      }

      const hashedPassword = this.hashPass(password)
      const user = await this.prisma.users.create({
        data: {
          name: name,
          email: email,
          passwordHash: hashedPassword
        }
      })
      
      delete user.passwordHash
      return user
    } catch (error) {     
      throw error
    }
  }

  hashPass(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return hashedPassword
  }

  async existEmail(email: string): Promise<boolean> {
    try {
      const result = await this.prisma.users.findUnique({ 
        where: {
          email: email
        }
      })

      console.log(result)
      return !!result
    } catch (error) {
      throw new Error("An error occurred while checking whether the value exists")
    }
  }
}