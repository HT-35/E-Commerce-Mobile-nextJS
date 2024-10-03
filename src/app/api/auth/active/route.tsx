import { checkMissingData } from '@/utils/checkMissingData';
import { sendRequest } from '@/utils/fetchApi';

const Port = process.env.NEXT_PUBLIC_PORT_NEST_SERVER;

export async function POST(request: Request) {
  try {
    const dataBody = await checkMissingData(request);

    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'POST',
      url: `http://localhost:${Port}/auth/active`,
      body: { ...dataBody },
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
