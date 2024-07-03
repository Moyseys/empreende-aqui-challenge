import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export default class CreateUser{
  @IsNotEmpty()
  @IsString()
  @Length(2 , 50)
  name: string
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(5 , 50)
  email: string
  
  @IsNotEmpty()
  @IsString()
  @Length(6 , 32)
  password: string
}