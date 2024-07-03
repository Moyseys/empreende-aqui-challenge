import { Module } from '@nestjs/common';
import AccountController from 'src/controllers/Accounts.controller';
import { PrismaService } from 'src/database/prisma.service';
import AccountRepository from 'src/repositories/AccountRepository';
import { PrismaAccountRepository } from 'src/repositories/implementation/PrismaAccountRepository';

@Module({
  controllers: [
    AccountController
  ],
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository
    }
  ]
})
export default class AccountModel{}