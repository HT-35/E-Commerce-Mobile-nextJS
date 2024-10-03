import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { NextRequest } from 'next/server';

const PORT = await env.NEXT_PUBLIC_PORT_NEST_SERVER();

export const GET = async (request: NextRequest) => {
  try {
    const name = request.nextUrl.searchParams.get('name');
    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    const res: any = await sendRequest({
      url: `localhost:${PORT}/product/search?name=${name}`,
      method: 'GET',
    });

    return Response.json(res, {
      status: res.statusCode,
    });
  } catch (error: any) {
    return Response.json(
      { Error: error.message },
      {
        status: 500,
      }
    );
  }
};
