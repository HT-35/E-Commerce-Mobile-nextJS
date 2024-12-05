/* eslint-disable prefer-const */
import queryString from 'query-string';

// Send data JSON
export const sendRequest = async <T,>(props: IRequest) => {
  //type
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  // Lọc headers để đảm bảo không có giá trị null hoặc undefined
  const validHeaders = Object.fromEntries(
    Object.entries({
      'content-type': 'application/json',
      ...headers,
    }).filter(([, value]) => typeof value === 'string')
  );

  const options: any = {
    method: method,
    headers: new Headers(validHeaders as Record<string, string>),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };

  if (useCredentials) options.credentials = 'include';

  if (url?.startsWith('localhost')) {
    url = `http://${url}`;
  }

  //if (queryParams) {
  //  url = `${url}?${queryString.stringify(queryParams)}`;
  //}

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T; //generic
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? '',
          error: json?.error ?? '',
        } as T;
      });
    }
  });
};

// Send file : img, PDF,....
export const sendRequestFile = async <T,>(props: IRequest) => {
  //type
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  if (url.startsWith('localhost')) {
    url = `http://${url}`;
  }

  // Lọc các giá trị null hoặc undefined khỏi headers
  const validHeaders = Object.fromEntries(
    Object.entries(headers).filter(([, value]) => value != null) // giữ lại các giá trị không null
  ) as Record<string, string>;

  const options: any = {
    method: method,
    headers: new Headers(validHeaders),
    body: body ?? null,
    ...nextOption,
  };

  if (useCredentials) options.credentials = 'include';

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T; //generic
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? '',
          error: json?.error ?? '',
        } as T;
      });
    }
  });
};
