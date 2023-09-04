import legal from '@/gravity-legal-requests';

export interface StartPaymentSessionParams {
  firmToken: string;
}

export async function startPaymentSession(
  params: StartPaymentSessionParams
): Promise<void> {
  const paymentToken = await legal.startPaymentSession({
    firmToken: params.firmToken,
  });
  return paymentToken;
}
