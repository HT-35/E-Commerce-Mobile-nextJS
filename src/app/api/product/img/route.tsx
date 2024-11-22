import { sendRequest, sendRequestFile } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const PORT = await env.NEXT_PUBLIC_PORT_NEST_SERVER();

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();
    console.log(`data:`, data);

    const bearerToken = headers().get('authorization');
    const res: any = await sendRequestFile({
      method: 'POST',
      url: `localhost:${PORT}/product/img`,
      headers: { Authorization: bearerToken },
      body: data,
    });

    return Response.json(res, { status: res.statusCode });
  } catch (error: any) {
    console.log('error:', error);
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
