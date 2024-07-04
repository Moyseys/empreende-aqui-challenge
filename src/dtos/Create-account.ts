import { IsNotEmpty, IsString, Length, IsIn, IsPositive } from 'class-validator'

export default class CreateAccount{
  @IsNotEmpty()
  @IsString()
  @Length(2 , 50)
    name: string
  
  @IsIn(["CURRENT", "SAVINGS"])
    type: "CURRENT" | "SAVINGS"
  
  @IsNotEmpty()
  @IsPositive()
    balance: number
}