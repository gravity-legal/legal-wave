import { prisma } from '@/lib/prisma';
import { NextApiRequestWithSession } from '@/server';
import type { NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  const { session } = req;

  // Nullify the Firm Api Token in our database
  await prisma.firm.update({
    where: {
      id: session.user.firm.id,
    },
    data: {
      glApiToken: null,
    },
  });

  res.send(200);
}
