import { IsNotEmpty } from 'class-validator'

export default class CreateUser{
  @IsNotEmpty()
  name: string
  
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}