import { PrismaService } from 'src/database/prisma.service';
import AbstractUserRepository from '../AbstractUserRepository';
import { Injectable } from '@nestjs/common';


@Injectable()
export default class UserRepository implements AbstractUserRepository{
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
      const user = await this.prisma.users.create({
        data: {
          name: name,
          email: email,
          passwordHash: password
        }
      })
      
      delete user.passwordHash
      return user
    } catch (error) {     
      throw error
    }
  }

  async findByEmail(email: string){
    try {
      const result = await this.prisma.users.findUnique({ 
        where: {
          email: email
        }
      })
      
      return result
    } catch (error) {
      throw new Error("An error occurred while checking whether the value exists")
    }
  }

  async findById(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: id
        }
      })  

      return user
    } catch (error) {    
      throw new Error("An error occurred when checking whether the user exists")
    }
  }

}