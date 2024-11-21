import { NextResponse } from 'next/server';
import { JwksClient } from 'jwks-rsa';
import jwt from 'jsonwebtoken';

// Buat instance JWKS Client
const jwksClient = new JwksClient({
  jwksUri: process.env.KINDE_PUBLIC_KEY_URL, // URL JWKS
});

// Fungsi untuk mendapatkan kunci publik berdasarkan `kid`
const getKey = async (header) => {
  const key = await jwksClient.getSigningKey(header.kid);
  return key.getPublicKey();
};

export async function middleware(request) {
  const token = request.cookies.get('authToken')?.value;

  if (!token) return NextResponse.redirect('/');

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        (header, callback) => {
          getKey(header)
            .then((key) => callback(null, key))
            .catch(callback);
        },
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        }
      );
    });

    const role = decoded?.role;
    const { pathname } = request.nextUrl;

    if ((pathname.startsWith('/dashboard') && role !== 'admin') || (pathname.startsWith('/user') && role !== 'user')) {
      return NextResponse.redirect('/unauthorized');
    }

    const response = NextResponse.next();
    response.headers.set('x-user-role', role);
    return response;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect('/');
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*'],
};
