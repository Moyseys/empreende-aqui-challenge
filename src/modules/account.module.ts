import { Module } from '@nestjs/common';
import AccountController from 'src/controllers/Accounts.controller';
import { PrismaService } from 'src/database/prisma.service';
import AbstractAccountRepository from 'src/repositories/AbstractAccountRepository';
import AbstractUserRepository from 'src/repositories/AbstractUserRepository';
import { AccountRepository } from 'src/repositories/implementation/Account.repository';
import UserRepository from 'src/repositories/implementation/User.repository';
import { AccountService } from 'src/services/Account.service';

@Module({
  controllers: [
    AccountController
  ],
  providers: [
    AccountService,
    UserRepository,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository
    },
    {
      provide: AbstractAccountRepository,
      useClass: AccountRepository
    },
    PrismaService,
  ],
})
export default class AccountModel{}