import { NextResponse } from 'next/server';
import { authMiddleware, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(req) {
  console.log('Middleware triggered');
  const response = await authMiddleware(req);
  if (!response) {
    console.log('Auth middleware response failed, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { getUser, getAccessToken } = getKindeServerSession(req);
  const user = await getUser();
  const accessToken = await getAccessToken();
  console.log('User:', user);
  console.log('Access Token:', accessToken);

  if (accessToken && accessToken.permissions) {
    console.log('User permissions from access token:', accessToken.permissions);
  } else {
    console.log('User permissions not found');
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Accessing /dashboard');
    if (accessToken?.permissions?.includes(`${process.env.KINDE_ADMIN_KEY}`)) {
      console.log('User has admin permission, access granted to /dashboard');
      return NextResponse.next(); // Izinkan akses ke /dashboard
    } else {
      console.log('User does not have admin permission, redirecting to /');
      return NextResponse.redirect(new URL('/', req.url)); // Redirect ke halaman utama jika tidak memiliki izin
    }
  }

  // Redirect ke dashboard jika user berhasil login sebagai admin
  if (req.nextUrl.pathname === '/' && accessToken?.permissions?.includes(`${process.env.KINDE_ADMIN_KEY}`)) {
    console.log('Admin logged in, redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|kontak|kategori1|kategori2|kategori3|kategori4).*)',
  ],
};
