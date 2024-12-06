import { checkMissingData } from '@/utils/checkMissingData';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';

export async function POST(request: Request) {
  try {
    const dataBody = await checkMissingData(request);

    const res: any = await sendRequest<IBackendRes<IRegisterUser>>({
      method: 'POST',

      url: listApi_Nest_Server_API_Route.register(),
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
