import { checkMissingData } from '@/utils/checkMissingData';
import { sendRequest } from '@/utils/fetchApi';

const Port = process.env.PORT_NEST_SERVER;

export async function POST(request: Request) {
  try {
    const dataBody = await checkMissingData(request);

    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'POST',
      url: `http://localhost:${Port}/auth/login`,
      body: { ...dataBody },
    });

    const statusCode = res.statusCode ?? 400;

    console.log('res:', res.statusCode);
    //const data = await res.json();

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
