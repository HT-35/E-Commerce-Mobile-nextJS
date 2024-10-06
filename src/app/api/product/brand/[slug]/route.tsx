import { sendRequest } from '@/utils/fetchApi';

const Port = process.env.NEXT_PUBLIC_PORT_NEST_SERVER;

// get detail by slug
export async function GET({ params }: { params: { slug: string } }) {
  const brand = params.slug;

  //console.log(`localhost:${Port}/product/brand/${brand}`);
  try {
    const res: any = await sendRequest<IBackendRes<any>>({
      method: 'GET',
      url: `localhost:${Port}/product/brand/${brand}`,
    });

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
