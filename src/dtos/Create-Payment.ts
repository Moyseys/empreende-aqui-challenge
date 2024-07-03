import { IsNotEmpty, IsString, Length, IsIn, IsPositive } from 'class-validator'

export default class CreatePayment{
  @IsPositive()
  @IsNotEmpty()
  idDestiny: number
  
  @IsNotEmpty()
  @IsPositive()
    value: number
  
  @IsNotEmpty()
  @IsString()
    description: string 
}