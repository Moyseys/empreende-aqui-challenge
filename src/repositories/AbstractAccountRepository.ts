export default abstract class AbstractAccountRepository{

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

  abstract findById(id: number): Promise<{
    id: number;
    name: string;
    type: string;
    balance: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }>

  
  abstract updateBalance(id: number, newBalance: number): Promise<boolean>
} 