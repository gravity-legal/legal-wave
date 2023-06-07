import { userSignup } from '@/b-logic/userSignup';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { body } = req;

  const params = {
    email: body.email,
    firmName: body.firmName,
    password: body.password,
    req,
    res,
  };

  const user = await userSignup(params);
  res.status(200).json(user);
}
