export default abstract class AbstractUserRepository {

  abstract create(name: string, email: string, password: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | Msg>

  abstract findByEmail(email: string): Promise<{
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }>

  abstract findById(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }>
} 