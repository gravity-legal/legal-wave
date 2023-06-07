import { prisma } from '@/conn/prisma';
import gl from '@/gravity-legal';
import { User } from '@prisma/client';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

export interface UserSignupParams {
  email: string;
  firmName: string;
  password: string;
  req: IncomingMessage;
  res: ServerResponse;
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
  const apiToken = await gl.createFirm(params.firmName);

  // update our firm with the apiToken
  await prisma.firm.update({
    where: {
      id: user.firmId,
    },
    data: {
      glApiToken: apiToken,
    },
  });

  const { req, res } = params;
  const cookies = new Cookies(req, res);
  cookies.set('wave:userId', user.id);

  return user;
}
