import { NextResponse } from 'next/server';
import { authMiddleware, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(req) {
  console.log('Middleware triggered');

  // Validasi autentikasi dasar
  const response = await authMiddleware(req);
  if (!response) {
    console.log('Auth middleware response failed, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Mendapatkan user dan permission
  const { getUser, getAccessToken } = getKindeServerSession(req);
  const user = await getUser();
  const accessToken = await getAccessToken();
  console.log('User:', user);
  console.log('Access Token:', accessToken);

  // Ambil izin pengguna dari accessToken
  const userPermissions = accessToken?.permissions || [];
  const isAdmin = userPermissions.includes(`${process.env.KINDE_ADMIN_KEY}`);
  const isUser = userPermissions.includes(`${process.env.KINDE_USER_KEY}`);

  // Validasi halaman detail (kategori/detail/:id)
  const detailPattern = /^\/[a-zA-Z0-9-_]+\/detail\/[a-zA-Z0-9-_]+$/;
  if (detailPattern.test(req.nextUrl.pathname)) {
    console.log(`Accessing detail page: ${req.nextUrl.pathname}`);
    if (!user) {
      console.log('User not logged in, redirecting to login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (!isUser && !isAdmin) {
      console.log('Insufficient permissions to access detail page, redirecting to /');
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next(); // Izinkan akses jika memiliki izin user atau admin
  }

  // Validasi halaman dashboard (khusus admin)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Accessing /dashboard');
    if (isAdmin) {
      console.log('User has admin permission, access granted to /dashboard');
      return NextResponse.next();
    } else {
      console.log('User does not have admin permission, redirecting to /');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Redirect admin ke /dashboard jika mereka login
  if (req.nextUrl.pathname === '/' && isAdmin) {
    console.log('Admin logged in, redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Izinkan user mengakses halaman lain jika sudah login
  if (isUser || isAdmin) {
    console.log('User logged in, allowing access');
    return NextResponse.next();
  }

  return response; // Default response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|kontak|edukasi|fiksi|cerita|sejarah).*)',
    '/:path*/detail/:path*', // Tangkap semua halaman detail di kategori
  ],
};
