import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  const res = NextResponse.next();
  return res;
}
