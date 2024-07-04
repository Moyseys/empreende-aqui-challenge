import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserPayload from 'src/interfaces/userPayload';
import AbstractUserRepository from 'src/repositories/AbstractUserRepository';
import Hash from 'src/utils/Hash';


@Injectable()
export default class AuthService{
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly hash: Hash,
    private readonly jwtService: JwtService
  ) { }
  

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findByEmail(email)      
      if (!user) {
        const error = {
          message: `User with email ${email}, not exist!`,
          error: "Invalid User",
          statusCode: 400
        };
        throw error;
      }

      const authenticatedUser = await this.hash.compare(password, user.passwordHash)
      if(!authenticatedUser) {
        const error = {
          message: `Invalid password`,
          error: "Invalid password",
          statusCode: 400
        };
        throw error;
      }

      const payload: UserPayload = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      }

      const token = this.jwtService.sign(payload)

      delete user.passwordHash
      
      return {
        ...user,
        token
      }
    } catch (error) {
      throw error
    }
  }
}