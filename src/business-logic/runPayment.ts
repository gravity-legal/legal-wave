import legal, { Payment } from '@/gravity-legal-requests';

export interface RunPaymentParams {
  amount: number;
  payerEmail?: string;
  payerName?: string;
  payerZip?: string;
  paymentMethod: 'CREDIT' | 'DEBIT' | 'ACH';
  paymentToken: string;
  savePaymentMethod?: boolean;
}

export async function runPayment(
  firmToken: string,
  params: RunPaymentParams
): Promise<Payment> {
  const result = await legal.runPayment(firmToken, params);
  return result.runPayment;
}
