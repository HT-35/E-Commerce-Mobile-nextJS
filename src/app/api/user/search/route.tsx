import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const PORT = await env.NEXT_PUBLIC_PORT_NEST_SERVER();

export const GET = async (request: NextRequest) => {
  const bearerToken = headers().get('authorization');

  const name = request.nextUrl.searchParams.get('name');

  try {
    const res: any = await sendRequest({
      method: 'GET',
      url: `localhost:${PORT}/user/search?name=${name}`,
      headers: { Authorization: bearerToken },
    });

    return Response.json(res, { status: res.statusCode });
  } catch (error: any) {
    return Response.json(
      {
        Error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};