import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('token', '', {
    expires: new Date(0),
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
  });

  return response;
}

