import { PrismaService } from 'src/database/prisma.service';
import UserRepository from '../UserRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PrismaUserRepository implements UserRepository{
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(name: string, email: string, password: string): Promise<void> {
    const user = await this.prisma.users.create({
      data: {
        name: name,
        email: email,
        passwordHash: password
      }
    })
    console.log(user);
    
    return
  }
}