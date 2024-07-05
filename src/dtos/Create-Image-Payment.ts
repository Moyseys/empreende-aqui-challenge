import { IsNotEmpty } from 'class-validator'

export default class CreateImagePayment{
  @IsNotEmpty()
  paymentId: string
}