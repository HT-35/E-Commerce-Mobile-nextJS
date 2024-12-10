'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendRequest } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';

import { formatCurrency } from '@/utils/price';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { Bounce, toast } from 'react-toastify';

const Bill = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('vnp_OrderInfo');
  // Decode giá trị để đọc được thông tin
  const idOrder = decodeURIComponent(search!);

  const router = useRouter();

  const { accessToken } = useAppSelector((item) => item.account);

  console.log(idOrder);

  if (!accessToken) {
    router.refresh();
  }

  useEffect(() => {
    const getBillDetail = async () => {
      const bill = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Nest_Server_API_Route.getDetailBill(idOrder),
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('');
      console.log('');
      console.log('bill  :   ', bill);
      console.log('');
      console.log('');
      console.log('');
      if (
        bill?.data?.statusPayment === 'paid' ||
        bill?.data?.CodeShipGHN !== ''
      ) {
        router.push(`/bill/${bill?.data?._id}`);
      } else {
        const updateBill = async () => {
          const bill = await sendRequest<IBackendRes<any>>({
            method: 'PATCH',
            url: listApi_Nest_Server_API_Route.updateSuccessBillVnPay(idOrder),
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          console.log('');
          console.log('');
          console.log('bill  :   ', bill);
          console.log('');
          console.log('');
          console.log('');
          if (bill.statusCode === 200) {
            router.push(`/bill/${bill?.data?._id}`);
          }
        };
        updateBill();
      }
    };
    getBillDetail();
  }, [accessToken, idOrder, router]);

  return (
    <>
      <div className="flex justify-center mt-20 mb-5">
        {' '}
        <div className=" w-16 h-16 rounded-full border-8 border-black border-t-transparent border-b-transparent animate-spin flex justify-center items-center">
          <div className=" w-10 h-10 rounded-full border-8 border-black border-t-transparent border-b-transparent animate-spin"></div>
        </div>
      </div>
      <div className="text-center">Tiến Hành Đặt Hàng ...</div>
    </>
  );
};

export default Bill;
