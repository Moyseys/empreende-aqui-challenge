import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/Users.controller';
import { PrismaService } from 'src/database/prisma.service';
import AbstractUserRepository from 'src/repositories/AbstractUserRepository';
import UserRepository from 'src/repositories/implementation/User.repository';
import UserService from 'src/services/User.service';
import Hash from 'src/utils/Hash';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    PrismaService,
    Hash,
    UserService,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository
    }
  ]
})
export default class UserModule{}