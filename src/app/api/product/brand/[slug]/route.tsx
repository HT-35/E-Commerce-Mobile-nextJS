import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { NextRequest, NextResponse } from 'next/server';

// get detail by slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const res: any = await sendRequest<IBackendRes<any>>({
      method: 'GET',
      url: listApi_Nest_Server_API_Route.getProductByBrand(slug),
    });

    return NextResponse.json(res, {
      status: +res.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return NextResponse.json(
      { Error: error.message },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
