import { sendRequest } from '@/utils/fetchApi';

const Port = process.env.NEXT_PUBLIC_PORT_NEST_SERVER;

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
      url: `localhost:${Port}/auth/new-password`,
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
