import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { headers } from 'next/headers';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('');
    console.log('');
    console.log('');
    console.log(params.id);
    console.log('');
    console.log('');
    console.log('');

    const bearerToken = headers().get('authorization');

    const dataText = await request.text();
    let dataJson;
    dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);

    const createAddress = await sendRequest({
      url: listApi_Nest_Server_API_Route.addressDetail(params.id),
      method: 'PATCH',
      body: { ...dataJson },
      headers: { Authorization: bearerToken },
    });
    return Response.json(createAddress);
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
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('');
    console.log('');
    console.log('');
    console.log(params.id);
    console.log('');
    console.log('');
    console.log('');

    const bearerToken = headers().get('authorization');

    const deleteAddress = await sendRequest({
      url: listApi_Nest_Server_API_Route.addressDetail(params.id),
      method: 'DELETE',
      headers: { Authorization: bearerToken },
    });
    return Response.json(deleteAddress);
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
}
