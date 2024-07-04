import { Body, Req, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import CreateAccount from 'src/dtos/Create-account';
import GuardRouter from 'src/guard/Route.guard';
import RequestWithUserData from 'src/interfaces/requestWithUserData';
import UserPayload from 'src/interfaces/userPayload';
import { AccountService } from 'src/services/Account.service';

@UseGuards(GuardRouter)
@Controller("accounts")
export default class AccountController{
  constructor(private readonly accountService: AccountService ) { }
  
  @Post()
  async store(@Body() body: CreateAccount, @Req() req: RequestWithUserData) {
    try {
      const { name, balance, type } = body
      const { userId } = req.userData

      const account = await this.accountService.createAccount(name, userId, type, balance)
    
      return account
    } catch (error) {   
      if (error as Msg) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}