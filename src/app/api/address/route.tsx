import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET() {
  const bearerToken = headers().get('authorization');

  const res = await sendRequest({
    url: listApi_Nest_Server_API_Route.address(),
    method: 'GET',
    headers: { Authorization: bearerToken },
  });

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  try {
    const bearerToken = headers().get('authorization');

    const dataText = await request.text();
    let dataJson;
    dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);

    const createAddress = await sendRequest({
      url: listApi_Nest_Server_API_Route.address(),
      method: 'POST',
      body: { ...dataJson },
      headers: { Authorization: bearerToken },
    });
    return Response.json(createAddress);
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
}
