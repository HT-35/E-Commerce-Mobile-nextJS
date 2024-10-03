import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const PORT = await env.NEXT_PUBLIC_PORT_NEST_SERVER();

// get all user
export async function GET(request: NextRequest) {
  try {
    const bearerToken = headers().get('authorization');

    const searchParams = request.nextUrl.searchParams;

    const current = searchParams.get('current') ?? 1;
    const pageSize = searchParams.get('pageSize') ?? 10;

    const res: any = await sendRequest({
      url: `http://localhost:${PORT}/user?current=${current}&pageSize=${pageSize}`,
      method: 'GET',
      headers: { Authorization: bearerToken },
    });

    return Response.json(res, {
      status: res.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return Response.json(
      {
        Message: error.message,
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// create user
export const POST = async (request: NextRequest) => {
  const bearerToken = headers().get('authorization');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
  try {
    const res: any = await sendRequest({
      method: 'POST',
      url: `localhost:${PORT}/user/`,
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

// PATCH user
export const PATCH = async (request: NextRequest) => {
  const token = headers().get('authorization');

  const id = request.nextUrl.searchParams.get('id');

  const dataText = await request.text();
  let dataJson;

  dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);

  try {
    if (!id) {
      return Response.json(
        { error: 'Missing Slug' },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const res: any = await sendRequest({
      url: `localhost:${PORT}/user/update/${id}`,
      method: 'PATCH',
      headers: { Authorization: token },
      body: { ...dataJson },
    });

    //console.log('res:', res);
    return Response.json(res, {
      status: res.statusCode,
    });
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

// DELETE user
export const DELETE = async (request: NextRequest) => {
  const token = headers().get('authorization');

  const id = request.nextUrl.searchParams.get('id');

  console.log('');
  console.log('');
  console.log('');
  console.log('slug', id);
  console.log('');
  console.log('');

  try {
    if (!id) {
      return Response.json(
        { error: 'Missing Slug' },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const res: any = await sendRequest({
      url: `localhost:${PORT}/user/delete/${id}`,
      method: 'DELETE',
      headers: { Authorization: token },
    });

    //console.log('res:', res);
    return Response.json(res, {
      status: res.statusCode,
    });
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
