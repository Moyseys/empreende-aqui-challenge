import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import AuthDTO from 'src/dtos/Auth';
import AuthService from 'src/services/Auth.service';

@Controller("auth")
export default class AuthController{
  constructor(private readonly authService: AuthService){}

  @Post()
  async auth(@Body() body: AuthDTO) {
    try {
      const { email, password } = body

      const authUser = await this.authService.login(email, password)
      return authUser
    } catch (error) {
      if (error as Msg) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException("Internal server error!", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  }
}