// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Установка куки с истекшим сроком действия
  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set('token', 'logged in');

  return response;
}
