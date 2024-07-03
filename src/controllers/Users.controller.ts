import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import CreateUser from '../dtos/Create-user';
import UserRepository from '../repositories/UserRepository';


@Controller("users")
export class UsersController {
  constructor( 
    private readonly userRepository: UserRepository
  ) {}

  @Post()
  async createUser(@Body() body: CreateUser) {
    try {
      const  { name, email, password } = body

      const res = await this.userRepository.create(name, email, password)

      return res
    } catch (error) {
      if ((error as Msg).statusCode) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get()
  async getHello() {
    // const accaunts = await this.prisma.users.findMany({})
    return "Hello World";
  }
}
