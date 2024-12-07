import { checkMissingData } from '@/utils/checkMissingData';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const dataBody = await checkMissingData(request);
    //console.log(`dataBody:`, dataBody);

    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'POST',
      url: listApi_Nest_Server_API_Route.login(),
      body: { ...dataBody },
    });

    const statusCode = res.statusCode ?? 400;

    console.log('res:', res);

    if (res.statusCode > 400) {
      return Response.json(res, {
        status: res.statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const cookieStore = cookies();

    // Đặt access_token và refresh_token vào cookie
    cookieStore.set({
      name: 'access_token',
      value: res.data.access_token,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    cookieStore.set({
      name: 'refresh_token',
      value: res.data.refesh_token,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    cookieStore.set({
      name: 'id',
      value: res.data.user._id,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
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
        error,
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
