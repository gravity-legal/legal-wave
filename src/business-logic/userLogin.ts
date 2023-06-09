import { prisma } from '@/conn/prisma';
import { User } from '@prisma/client';

export interface UserLoginParams {
  email: string;
  password: string;
}

export async function userLogin(params: UserLoginParams): Promise<User> {
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

  return user;
}
