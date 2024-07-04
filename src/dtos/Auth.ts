import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class AuthDTO{
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}