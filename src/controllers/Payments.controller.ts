import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import CreatePayment from 'src/dtos/Create-Payment';

@Controller("Payment")
export default class {
  constructor(private readonly paymentRepository: PaymentRequest){}

  @Post()
  async create(@Body() body: CreatePayment) {
    try {
      const { idDestiny, value, description } = body
      

    
    } catch (error) {
      if (error as Msg) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}