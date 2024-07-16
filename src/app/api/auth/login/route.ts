import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set('token', 'logged in', { 
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60, // 1 час
    path: '/',
    sameSite: 'strict'
  });

  return response;
}
