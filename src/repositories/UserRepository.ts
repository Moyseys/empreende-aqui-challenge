import { PrismaService } from 'src/database/prisma.service';

export default abstract class UserRepository {

  abstract create(name: string, email: string, password: string): Promise<void>
}