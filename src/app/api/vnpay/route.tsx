import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

// PATCH user
export const PATCH = async (request: NextRequest) => {
  const token = headers().get('authorization');

  const id = request.nextUrl.searchParams.get('id');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);

  try {
    if (!id) {
      return Response.json(
        { error: 'Missing Slug' },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const res: any = await sendRequest({
      url: listApi_Nest_Server_API_Route.updateBill(id),
      method: 'PATCH',
      headers: { Authorization: token },
      body: { ...dataJson },
    });

    //console.log('res:', res);
    return Response.json(res, {
      status: res.statusCode,
    });
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
