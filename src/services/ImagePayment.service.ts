import { Injectable } from '@nestjs/common';
import { uploadToS3 } from 'src/config/multer.config';
import AbstractImagePaymentRepository from 'src/repositories/AbstractImagePaymentRepository';
import AbstractPaymentRepository from 'src/repositories/AbstractPaymentRepository';

@Injectable()
export class ImagePaymentService {
  constructor(
    private readonly imagePayment: AbstractImagePaymentRepository,
    private readonly payment: AbstractPaymentRepository
  ) { }

  async registerImage(userId: number, originalname: string, buffer: Buffer, mimetype: string, paymentId: number) {
    try {
      const payment = await this.payment.findById(paymentId)
      if (!payment) {
        const error = {
          message: "Not exist a payment whith this ID",
          error: "IdPayment invalid",
          statusCode: 400
        }     
        throw error
      }   
      if (payment.userId !== userId) {
        const error = {
          message: "Only allowed to add images to your payments",
          error: "IdPayment invalid",
          statusCode: 400
        }     
        throw error
      }

      const newFileName = crypto.randomUUID() + '-' + originalname
      
      const url = await uploadToS3(buffer, newFileName, mimetype);
    
      const imagePayment = await this.imagePayment.register(url, paymentId, newFileName);
    
      return imagePayment
    } catch (error) {
      throw error
    }
  }
}
