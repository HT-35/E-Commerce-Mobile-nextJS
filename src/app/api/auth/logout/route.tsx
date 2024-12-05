import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.set({
      name: 'access_token',
      value: '',
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 0,
    });
    cookieStore.set({
      name: 'refresh_token',
      value: '',
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 0,
    });
    cookieStore.set({
      name: 'id',
      value: '',
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 0,
    });
    return Response.json(
      { message: 'Logout successful. All cookies cleared.' },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return Response.json(
      {
        Error: error.message,
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}