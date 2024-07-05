import { Body, Controller, Get, HttpException, HttpStatus, Req, UseGuards} from '@nestjs/common';
import Report from 'src/dtos/Report';
import GuardRouter from 'src/guard/Route.guard';
import RequestWithUserData from 'src/interfaces/requestWithUserData';
import PaymentService from 'src/services/Payment.service';

@UseGuards(GuardRouter)
@Controller("report")
export default class ReportController{
  constructor(private readonly payment: PaymentService){}

  @Get()
  async index(@Body() body: Report, @Req() req: RequestWithUserData) {
    try {
      const { startDate, finalDate } = body
      const report = await this.payment.report(
        req.userData.userId,
        new Date(startDate),
        new Date(finalDate)
      )

      return report
    } catch (error) {
      if (error as Msg) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException("Internal server error!", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  }
}