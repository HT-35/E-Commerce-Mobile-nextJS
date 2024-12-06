import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const email = searchParams.get('email');

  try {
    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'GET',
      url: listApi_Nest_Server_API_Route.reSendCodeid(email!),
    });

    return Response.json(res, {
      status: +res.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.log('error:', error.message);
    return Response.json(
      {
        statusCode: 400,
        message: 'Re-send otp code failed !!',
        error: error.message,
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
