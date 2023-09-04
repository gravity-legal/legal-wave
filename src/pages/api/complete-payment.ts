import { runPayment } from '@/business-logic';
import { Payment, RunPaymentInput } from '@/gravity-legal-requests';
import { Session } from '@/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Payment>
) {
  const { body } = req;
  const session: Session = (req as any).session;
  const firmToken = session.user.firm.glApiToken as string;

  const runPaymentInput: RunPaymentInput = {
    amount: parseInt(body.amount),
    payerEmail: body.email,
    paymentMethod: body.paymentMethod,
    paymentToken: body.paymentToken,
  };

  const payment = await runPayment(firmToken, runPaymentInput);
  res.status(200).json(payment);
}
