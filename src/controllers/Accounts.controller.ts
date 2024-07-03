import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import CreateAccount from 'src/dtos/Create-account';
import AccountRepository from 'src/repositories/AccountRepository';

@Controller("accounts")
export default class AccountController{
  constructor(private readonly accountRepository: AccountRepository ) { }
  
  @Post()
  async store(@Body() body: CreateAccount) {
    try {
      const { name, userId, balance, type } = body

      const account = await this.accountRepository.register(name, userId, type, balance)
    
      return account
    } catch (error) {
      console.log(error)      
      if (error as Msg) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}