import { sendRequest } from '@/utils/fetchApi';
import { listApi_Next_Server } from '@/utils/listApi';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const adminPath = ['/admin'];
const privatePath = ['/user/profile', '/cart', '/bill'];
const authPaths = ['/auth'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookie = request.cookies.get('access_token');
  const id = request.cookies.get('id');

  let role = '';

  if (cookie?.value) {
    try {
      const res: any = await sendRequest<IBackendRes<IUser>>({
        method: 'GET',
        url: listApi_Next_Server.detailUser(id?.value!),
        headers: { Authorization: `Bearer ${cookie?.value}` },
      });

      role = res.data.role;
    } catch (error) {
      console.log(error);
    }
  }

  if (cookie?.value === '') {
    request.cookies.delete('access_token');
  }

  // ====================  Admin truy cập '/admin'  ||  user truy cạp !== 'admin '  ====================================

  if (adminPath.includes(pathname) && role === '') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (adminPath.includes(pathname) && role === 'user') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname !== '/admin' && (role === 'admin' || role == 'employee')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // ========================================================

  if (role === '' && privatePath.includes(pathname)) {
    return NextResponse.redirect(new URL(`/auth?callback=${pathname}`, request.url));
  }

  ///// =================  đã login rồi thì ko login lại  ==========

  if (authPaths.includes(pathname) && role !== '') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //matcher: [...privatePath, ...authPaths],
  matcher: ['/', '/admin', '/auth', '/cart', '/product', '/product/:path*', '/bill', '/livestream', '/user/profile'],
};
