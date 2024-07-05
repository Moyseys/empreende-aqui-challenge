
export default abstract class AbstractImagePaymentRepository{
  abstract register(url: string, paymentId: number, fileName: string): Promise<{
    id: number;
    url: string;
    fileName: string;
    paymentId: number;
    createdAt: Date;
    updatedAt: Date;
  }>
}