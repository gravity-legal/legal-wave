import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const hmac = crypto.createHmac(
    'sha512',
    process.env.GL_WEBHOOK_SECRET as string
  );
  hmac.update(JSON.stringify(body));
  const signature = hmac.digest('base64');

  if (signature !== req.headers['x-signature']) {
    console.log('Incoming Webhook: Signature ❌');
    res.send(400);
    return;
  }

  console.log('Incoming Webhook: Signature ✅');
  console.log(JSON.stringify(req.body, null, 2));
  res.send(200);
}
