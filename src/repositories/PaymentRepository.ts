
export default abstract class PaymentRepository{
  abstract register(idDestiny: number, idOrigin: number, value: number, description: string): Promise<{
    id: number;
    value: number;
    description: string;
    accountIdOrigin: number;
    accountIdDestiny: number;
    createdAt: Date;
    updatedAt: Date;
  }>

  protected abstract accountExist(id: number): Promise<boolean>
}