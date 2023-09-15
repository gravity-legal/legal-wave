import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { body } = req;

  const user = await prisma.user.create({
    data: {
      password: body.password,
      username: body.username,
      firm: {
        create: {
          name: body.firmName,
        },
      },
    },
  });

  const cookies = new Cookies(req, res);
  cookies.set('wave:userId', user.id);

  res.status(200).json(user);
}
