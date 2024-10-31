import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const PORT = await env.NEXT_PUBLIC_PORT_NEST_SERVER();

export const GET = async (request: NextRequest) => {
  const bearerToken = headers().get('authorization');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
  try {
    const res: any = await sendRequest({
      method: 'GET',
      url: `localhost:${PORT}/user/cart`,
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
      url: `localhost:${PORT}/user/cart`,
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

export const DELETE = async (request: NextRequest) => {
  const product = request.nextUrl.searchParams.get('product');

  const bearerToken = headers().get('authorization');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
  try {
    const res: any = await sendRequest({
      method: 'DELETE',
      url: `localhost:${PORT}/user/cart/delete/${product}`,
      headers: { Authorization: bearerToken },
      body: { ...dataJson },
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
