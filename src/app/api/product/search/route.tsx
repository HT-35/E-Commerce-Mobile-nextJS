import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { env } from '@/utils/listENV';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const name = request.nextUrl.searchParams.get('name');
    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    const res: any = await sendRequest({
      url: listApi_Nest_Server_API_Route.searchProductByName(name),
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
