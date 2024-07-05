import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import CreateUser from '../dtos/Create-user';
import UserService from 'src/services/User.service';

@Controller("users")
export class UsersController {
  constructor( 
    private readonly userService: UserService
  ) {}

  @Post()
  async createUser(@Body() body: CreateUser) {
    try {
      const { name, email, password } = body

      const res = await this.userService.createUser(name, email, password)

      return res
    } catch (error) {    
      if ((error as Msg).statusCode) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
