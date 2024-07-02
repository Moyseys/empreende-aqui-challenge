import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import CreateUser from './dtos/create-user';
import UserRepository from './repositories/UserRepository';

@Controller()
export class AppController {
  constructor( 
    private readonly userRepository: UserRepository
  ) {}

  @Post()
  async createUser(@Body() body: CreateUser) {
    const  { name, email, password } = body

    this.userRepository.create(name, email, password)

    return { name, email, password }
  }

  @Get()
  async getHello() {
    // const accaunts = await this.prisma.users.findMany({})
    return "Hello World";
  }
}
