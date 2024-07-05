import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import CreatePayment from 'src/dtos/Create-Payment';
import GuardRouter from 'src/guard/Route.guard';
import RequestWithUserData from 'src/interfaces/requestWithUserData';
import PaymentService from 'src/services/Payment.service';

@UseGuards(GuardRouter)
@Controller("payment")
export default class {
  constructor(private readonly paymentService: PaymentService){}

  @Post()
  async create(@Body() body: CreatePayment, @Req() req: RequestWithUserData) {
    try { 
      const { idOrigin, idDestiny, value, description } = body
      const { userId } = req.userData
      
      await this.paymentService.register(userId, idDestiny, idOrigin, value, description)
      return true
    } catch (error) {
      if (error as Msg) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}