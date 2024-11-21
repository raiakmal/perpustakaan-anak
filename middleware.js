import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.KINDE_PUBLIC_KEY, { algorithms: ['RS256'] });
    const role = decoded?.role;

    const url = request.nextUrl.clone();

    if (url.pathname.startsWith('/dashboard') && role !== 'admin') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/user') && role !== 'user') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next();
    response.headers.set('x-user-role', role);
    return response;
  } catch (err) {
    return NextResponse.redirect('/');
  }
}

// Config untuk menentukan route mana yang menggunakan middleware
export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*'],
};
