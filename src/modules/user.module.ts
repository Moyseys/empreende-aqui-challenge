import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/Users.controller';
import { PrismaService } from 'src/database/prisma.service';
import UserRepository from 'src/repositories/UserRepository';
import PrismaUserRepository from 'src/repositories/implementation/PrismaUserRepository';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ]
})
export default class UserModule{}