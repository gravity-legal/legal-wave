import { prisma } from '@/conn/prisma';
import legal from '@/gravity-legal';
import { User } from '@prisma/client';

export interface UserSignupParams {
  email: string;
  firmName: string;
  password: string;
}

export async function userSignup(params: UserSignupParams): Promise<User> {
  const user = await prisma.user.create({
    data: {
      email: params.email,
      password: params.password,
      firm: {
        create: {
          name: params.firmName,
        },
      },
    },
  });

  // now we need to create a firm
  // in Gravity Legal
  const firmApiToken = await legal.createFirm(params.firmName);

  // update our firm with the apiToken
  await prisma.firm.update({
    where: {
      id: user.firmId,
    },
    data: {
      glApiToken: firmApiToken,
    },
  });

  return user;
}
