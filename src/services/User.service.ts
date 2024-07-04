import { Injectable } from '@nestjs/common';
import AbstractUserRepository from 'src/repositories/AbstractUserRepository';
import Hash from 'src/utils/Hash';


@Injectable()
export default class UserService{
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly hash: Hash
  ){}

  async createUser(name: string, email: string, password: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | Msg> {
    try {
      const existEmail = await this.userRepository.findByEmail(email)
      if (existEmail) {
        const error = {
          message: "There is already a user with this email",
          error: "Duplicate email",
          statusCode: 400
        }     
        throw error
      }

      const hashedPassword = await this.hash.hashPass(password)
      const user = await this.userRepository.create(name, email, hashedPassword)

      return user
    } catch (error) {     
      throw error
    }
  }
}