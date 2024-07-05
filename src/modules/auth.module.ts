import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AuthController from 'src/controllers/Auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import AbstractUserRepository from 'src/repositories/AbstractUserRepository';
import UserRepository from 'src/repositories/implementation/User.repository';
import AuthService from 'src/services/Auth.service';
import Hash from 'src/utils/Hash';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRESIN
      }
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    Hash,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository
    },
    PrismaService
  ]
})
export default class AuthModule{}