import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export interface UserLoginParams {
  username: string;
  password: string;
}

export async function userLogin(params: UserLoginParams): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    throw new Error('user not found');
  }

  if (user.password !== params.password) {
    throw new Error('invalid password');
  }

  return user;
}
