import { sendRequest, sendRequestFile } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();
    console.log(`data:`, data);

    const bearerToken = headers().get('authorization');
    const res: any = await sendRequestFile({
      method: 'POST',

      url: listApi_Nest_Server_API_Route.productImg(),
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
