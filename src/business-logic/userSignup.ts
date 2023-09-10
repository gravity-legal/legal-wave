import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export interface UserSignupParams {
  firmName: string;
  password: string;
  username: string;
}

export async function userSignup(params: UserSignupParams): Promise<User> {
  const user = await prisma.user.create({
    data: {
      password: params.password,
      username: params.username,
      firm: {
        create: {
          name: params.firmName,
        },
      },
    },
  });

  return user;
}
