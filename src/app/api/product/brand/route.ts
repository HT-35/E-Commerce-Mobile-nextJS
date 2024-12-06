import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { NextRequest } from 'next/server';

// get all product
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const current = searchParams.get('current') ?? 1;
  const pageSize = searchParams.get('pageSize') ?? 10;

  try {
    const res: any = await sendRequest({
      url: listApi_Nest_Server_API_Route.getAllProduct({ current, pageSize }),
      method: 'GET',
    });

    return Response.json(
      { res },
      {
        status: +res.statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return Response.json(
      {
        Error: error.message,
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
