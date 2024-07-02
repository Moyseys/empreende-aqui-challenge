import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import UserRepository from './repositories/UserRepository';
import PrismaUserRepository from './repositories/prisma/PrismaUserRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
})
export class AppModule {}
