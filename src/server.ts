import { Prisma } from '@prisma/client';
import Cookies from 'cookies';
import express, { Express, NextFunction, Request, Response } from 'express';
import http, { IncomingMessage } from 'http';
import next from 'next';
import Route from 'route-parser';
import { prisma } from './conn/prisma';

export interface CreateServerResult {
  app: Express;
  httpServer: http.Server;
}

export interface RequestWithSession extends IncomingMessage {
  session: Session;
}

type UserWithFirm = Prisma.UserGetPayload<{
  include: {
    firm: true;
  };
}>;

export interface Session {
  user: UserWithFirm;
}

const notPages = [
  '/__nextjs*any',
  '/_next*any',
  '/api/*any',
  '/favicon.ico',
  '/graphql',
  '/images/*any',
];

export async function createServer(): Promise<CreateServerResult> {
  const app = express();
  const httpServer = http.createServer(app);

  // Setup the session
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    (req as any).session = await getSessionFromRequest(req, res);
    return next();
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (matchesSome(req.path, notPages)) {
      return next();
    }

    if (
      !(req as any).session.user &&
      !matchesSome(req.path, ['/login', '/signup', '/logout'])
    ) {
      res.redirect('/login');
      return;
    }

    next();
  });

  const nextServer = next({
    dev: true,
    hostname: 'localhost',
    port: 3000,
  });

  const nextHandler = nextServer.getRequestHandler();
  await nextServer.prepare();

  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });

  return {
    app,
    httpServer,
  };
}

async function getSessionFromRequest(
  req: Request,
  res: Response
): Promise<Session | {}> {
  const cookies = new Cookies(req, res);
  const userId = cookies.get('wave:userId');

  let user = null;

  if (userId) {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        firm: true,
      },
    });
  }

  return {
    user,
  };
}

function matchesSome(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const route = new Route(pattern);
    const match = route.match(path);
    return match !== false;
  });
}
