import { userLogin } from '@/b-logic/userLogin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const params = {
    req,
    res,
    email: body.email,
    password: body.password,
  };

  try {
    await userLogin(params);
    res.send(200);
  } catch (e) {
    res.send(403);
  }
}
