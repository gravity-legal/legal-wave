import { createFirm } from './createFirm';
import { runPayment } from './runPayment';
import { startPaymentSession } from './startPaymentSession';

export * from './createFirm';
export * from './runPayment';
export * from './startPaymentSession';

export const gqlEndpoint =
  process.env.GL_API_ENDPOINT ?? 'https://api.sandbox.gravity-legal.com/v2';

export default { createFirm, startPaymentSession, runPayment };
