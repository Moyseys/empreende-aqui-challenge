import { Body, Controller, HttpException, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'node:path';
import { upload, uploadToS3 } from 'src/config/multer.config';
import CreateImagePayment from 'src/dtos/Create-Image-Payment';
import GuardRouter from 'src/guard/Route.guard';
import RequestWithUserData from 'src/interfaces/requestWithUserData';
import { ImagePaymentService } from 'src/services/ImagePayment.service';

@UseGuards(GuardRouter)
@Controller("imagePayment")
export default class ImagePaymentController {
  constructor(private imagePayment: ImagePaymentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async uploadArquivo(@UploadedFile() img: Express.Multer.File, @Body('paymentId') paymentId: string, @Req() req: RequestWithUserData) {
    try {
      const { originalname, buffer, mimetype } = img    

      const imagePayment = await this.imagePayment.registerImage(originalname, buffer, mimetype, Number(paymentId));
      return imagePayment
    } catch (error) {
      if (error as Msg) {
        console.log(error)      
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException("Internal server error!", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

}