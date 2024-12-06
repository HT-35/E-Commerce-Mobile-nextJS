import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const res: any = await sendRequest<IBackendRes<any>>({
      method: 'GET',
      url: listApi_Nest_Server_API_Route.detailProduct(slug),
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
