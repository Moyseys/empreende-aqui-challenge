export default abstract class UserRepository {

  abstract create(name: string, email: string, password: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | Msg>

  abstract hashPass(password: string): string

  abstract existEmail(email: string): Promise<boolean>

}