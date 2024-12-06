import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';

export async function POST(request: Request) {
  try {
    let jsonData;
    const textData = await request.text();

    if (textData.length > 0) {
      jsonData = await JSON.parse(textData);
    } else {
      jsonData = null;
    }

    const res: any = await sendRequest<IBackendRes<any>>({
      url: listApi_Nest_Server_API_Route.newPassword(),
      method: 'POST',
      body: { ...jsonData },
    });
    const statusCode = res.statusCode ?? 400;

    return Response.json(res, {
      status: +statusCode,
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
