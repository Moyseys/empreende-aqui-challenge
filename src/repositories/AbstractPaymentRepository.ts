
export default abstract class AbstractPaymentRepository{
  abstract register(userId: number, idDestiny: number, idOrigin: number, value: number, description: string): Promise<{
    id: number;
    value: number;
    description: string;
    accountIdOrigin: number;
    accountIdDestiny: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }>

  abstract findById(id: number): Promise<{
    id: number;
    value: number;
    userId: number;
    description: string;
    accountIdOrigin: number;
    accountIdDestiny: number;
    createdAt: Date;
    updatedAt: Date;
  }>

  abstract report(userId: number, startDate: Date, finalDate: Date): Promise<{id: number;
    value: number;
    description: string;
    accountIdOrigin: number;
    accountIdDestiny: number;
    createdAt: Date;
    updatedAt: Date;
  }[]>
}