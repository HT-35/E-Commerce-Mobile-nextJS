import { checkMissingData } from '@/utils/checkMissingData';
import { sendRequest } from '@/utils/fetchApi';
import { cookies } from 'next/headers';

const Port = process.env.NEXT_PUBLIC_PORT_NEST_SERVER;

export async function POST(request: Request) {
  try {
    const dataBody = await checkMissingData(request);
    //console.log(`dataBody:`, dataBody);

    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'POST',
      url: `http://localhost:${Port}/auth/login`,
      body: { ...dataBody },
    });

    const statusCode = res.statusCode ?? 400;

    console.log('res:', res);
    //const data = await res.json();

    //const resData = res.data.user;

    const cookieStore = cookies();

    // Đặt access_token và refresh_token vào cookie
    cookieStore.set({
      name: 'access_token',
      value: res.data.access_token,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 10000,
    });

    cookieStore.set({
      name: 'refresh_token',
      value: res.data.refesh_token,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 10000,
    });

    cookieStore.set({
      name: 'id',
      value: res.data.user._id,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 10000,
    });

    return Response.json(res, {
      status: +statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
