// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('tkn');
  return response;
}

