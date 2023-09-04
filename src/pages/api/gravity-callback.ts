import { exchangeCodeForFirmToken } from '@/gravity-legal-requests/exchangeCodeForToken';
import { prisma } from '@/lib/prisma';
import { NextApiRequestWithSession } from '@/server';
import { NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  const { query } = req;
  const { code, state } = query;
  // The state that was passed to
  // gravity-legal.com/connect/legal-wave?state=STATE
  console.log('query.state=', state);

  // make a call to Gravity Legal to
  // exchange the code for a token
  const firmToken = await exchangeCodeForFirmToken(code as string);

  // now save the firmToken
  // under this user's firm
  const { firm } = req.session.user;
  await prisma.firm.update({
    where: {
      id: firm.id,
    },
    data: {
      glApiToken: firmToken,
    },
  });

  res.redirect(303, '/');
}
