export {};

declare global {
  // type truyền vào fetchApi để call api
  interface IRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: {
      Authorization?: string | null;
      Token?: string | null;
    };
    nextOption?: any;
  }

  // type dữ liệu trả về khi call Api
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  // type dữ liệu User trả về khi call Api
  export interface IUser {
    _id: string | undefined;
    accessToken: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    roles: string | undefined;
    email?: string | undefined;
    cart?: any;
  }

  export interface IRegisterUser {
    _id: string;
    email: string;
    name: string;
    roles: string;

    isActive: boolean;
    __v: 0;
  }

  interface initialDataAccount {
    _id?: string;
    accessToken?: string;
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
    cart?: any;
    roles?: string;
  }

  interface initialDataProduct {
    _id?: string;
    name?: string;
    price?: string;
    salePrice?: string;
    image?: string;
  }
}
