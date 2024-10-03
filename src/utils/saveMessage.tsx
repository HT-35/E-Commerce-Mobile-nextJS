'use client';
import { sendRequest } from '@/utils/fetchApi';

// lưu tin nhắn vào db
export const saveMessage = async ({
  url,
  data,
  token,
}: {
  url: string;
  data: any;
  token: string;
}) => {
  const res = await sendRequest({
    url,
    method: 'POST',
    body: { ...data },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};
