import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const bearerToken = headers().get('authorization');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
  try {
    const res: any = await sendRequest({
      method: 'GET',
      url: listApi_Nest_Server_API_Route.cart(),
      headers: { Authorization: bearerToken },
    });

    return Response.json(res, { status: res.statusCode });
  } catch (error: any) {
    console.log(`error:`, error);

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

export const POST = async (request: NextRequest) => {
  const bearerToken = headers().get('authorization');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
  try {
    const res: any = await sendRequest({
      method: 'POST',
      url: listApi_Nest_Server_API_Route.cart(),
      headers: { Authorization: bearerToken },
      body: { ...dataJson },
    });
    console.log('');
    console.log('');
    console.log('');
    console.log(`res:`, res);
    console.log('');
    console.log('');
    console.log('');

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
