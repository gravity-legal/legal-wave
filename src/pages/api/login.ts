import { userLogin } from '@/business-logic/userLogin';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  try {
    const user = await userLogin({
      username: body.username,
      password: body.password,
    });

    const cookies = new Cookies(req, res);
    cookies.set('wave:userId', user.id);

    res.send(200);
  } catch (e) {
    res.send(403);
  }
}
