import { NextRequest } from 'next/server';

export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('isAuth');
  return !!token;
}
