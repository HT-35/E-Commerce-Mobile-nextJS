import { sendRequest } from '@/utils/fetchApi';

import { NextRequest } from 'next/server';

const Port = process.env.NEXT_PUBLIC_PORT_NEST_SERVER;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const email = searchParams.get('email');

  try {
    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'GET',
      url: `localhost:${Port}/auth/re-send-codeid?email=${email}`,
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
