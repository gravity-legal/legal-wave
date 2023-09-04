import { userSignup } from '@/business-logic/userSignup';
import { User } from '@prisma/client';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { body } = req;

  const user = await userSignup({
    firmName: body.firmName,
    password: body.password,
    username: body.username,
  });

  const cookies = new Cookies(req, res);
  cookies.set('wave:userId', user.id);

  res.status(200).json(user);
}
