import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const PORT = await env.NEXT_PUBLIC_PORT_NEST_SERVER();

export const POST = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const slug = params?.slug;
  console.log('slug:', slug);

  const bearerToken = headers().get('authorization');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
  try {
    const res: any = await sendRequest({
      method: 'POST',
      url: `localhost:${PORT}/product/reply/comment/${slug}`,
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
