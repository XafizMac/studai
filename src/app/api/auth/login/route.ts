// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set('token', 'logged in', { 
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    sameSite: 'strict'
  });

  return response;
}
