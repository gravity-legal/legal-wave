import prisma from '@/lib/prisma';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    if (user.password !== body.password) {
      throw new Error('invalid password');
    }

    const cookies = new Cookies(req, res);
    cookies.set('wave:userId', user.id);

    res.send(200);
  } catch (e) {
    res.send(403);
  }
}
