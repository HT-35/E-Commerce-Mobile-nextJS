import { sendRequest } from '@/utils/fetchApi';

const Port = process.env.NEXT_PUBLIC_PORT_NEST_SERVER;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const nameSmartPhone = params.slug;

  try {
    const res: any = await sendRequest<IBackendRes<any>>({
      method: 'GET',
      url: `localhost:${Port}/product/${nameSmartPhone}`,
    });

    //console.log('product', product);

    return Response.json(res, {
      status: +res.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
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
