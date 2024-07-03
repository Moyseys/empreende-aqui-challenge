export default abstract class AccountRepository{

  abstract register(
    name: string,
    userId: number,
    type: "CURRENT" | "SAVINGS",
    balance: number,
  ): Promise<{
    id: number,
    name: string,
    userId: number,
    type: string,
    balance: number,
    createdAt: Date,
    updatedAt: Date,
  }>

  protected abstract userExists(id: number): Promise<boolean>
} 