import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { env } from '@/utils/listENV';
import { error } from 'console';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

// get all product
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const current = searchParams.get('current') ?? 1;
    const pageSize = searchParams.get('pageSize') ?? 10;
    const brand = searchParams.get('brand') ?? 10;

    const res: any = await sendRequest({
      url: listApi_Nest_Server_API_Route.getAllProduct({ current, pageSize }),
      method: 'GET',
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

// create product
export const POST = async (request: NextRequest) => {
  try {
    const headerList = headers().get('authorization');

    let dataJson;

    const dataText = await request.text();

    dataText.length > 0 ? (dataJson = JSON.parse(dataText)) : (dataJson = null);
    if (!dataJson) {
      return Response.json(
        {
          Message: 'Missing Data',
        },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('');
    console.log('');
    console.log('dataJson   :   ', dataJson);
    console.log('');
    console.log('');
    console.log('');

    const res: any = await sendRequest({
      method: 'POST',
      url: listApi_Nest_Server_API_Route.createProduct(),
      headers: { Authorization: headerList },
      body: { ...dataJson },
    });

    return Response.json(res, {
      status: res.statusCode,
    });
  } catch (error: any) {
    console.log('');
    console.log('');
    console.log('error  :  ', error);
    console.log('');
    console.log('');
    console.log('');
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
};

// PATCH product
export const PATCH = async (request: NextRequest) => {
  let dataJSON;
  const token = headers().get('authorization');

  const slug = request.nextUrl.searchParams.get('slug');
  //console.log('slug:', slug);

  try {
    const dataText = await request.text();

    dataText.length > 0 ? (dataJSON = JSON.parse(dataText)) : (dataJSON = null);
    if (!dataJSON) {
      return Response.json(
        { error: 'Missing Data' },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const res: any = await sendRequest({
      url: listApi_Nest_Server_API_Route.detailProduct(slug!),
      method: 'PATCH',
      body: { ...dataJSON },
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
// DELETE product
export const DELETE = async (request: NextRequest) => {
  const token = headers().get('authorization');

  const slug = request.nextUrl.searchParams.get('slug');

  try {
    if (!slug) {
      return Response.json(
        { error: 'Missing Slug' },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const res: any = await sendRequest({
      url: listApi_Nest_Server_API_Route.detailProduct(slug),
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
