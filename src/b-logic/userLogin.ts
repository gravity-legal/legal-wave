import { prisma } from '@/conn/prisma';
import { User } from '@prisma/client';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

export interface UserLoginParams {
  req: IncomingMessage;
  res: ServerResponse;
  email: string;
  password: string;
}

export async function userLogin(params: UserLoginParams): Promise<User> {
  const { req, res } = params;

  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  if (!user) {
    throw new Error('user not found');
  }

  if (user.password !== params.password) {
    throw new Error('invalid password');
  }

  const cookies = new Cookies(req, res);
  cookies.set('wave:userId', user.id);

  return user;
}
