'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendRequest } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';

import { formatCurrency } from '@/utils/price';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';

const Bill = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [bill, setBill] = useState<{
    _id: string;
    total: number;
    numberPhone: string;
    email: string;
    addressShiping: string;
    CodeShipGHN: string;
    itemArr: any[];
  }>({
    _id: '',
    total: 0,
    numberPhone: '',
    email: '',
    addressShiping: '',
    CodeShipGHN: '',
    itemArr: [],
  });

  const router = useRouter();

  const { accessToken, name } = useAppSelector((item) => item.account);

  if (!accessToken) {
    router.refresh();
  }

  useEffect(() => {
    const createBill = async () => {
      const bill = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Nest_Server_API_Route.getDetailBill(id),
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('');
      console.log('');
      console.log('bill  :   ', bill);
      console.log('');
      console.log('');
      console.log('');
      if (bill.statusCode === 200) {
        setBill({
          _id: bill.data._id,
          total: bill.data.total,
          numberPhone: bill.data.numberPhone,
          email: bill.data.email,
          addressShiping: bill.data.addressShiping,
          CodeShipGHN: bill.data.CodeShipGHN,
          itemArr: bill.data.itemArr,
        });
      }
    };
    createBill();
  }, [accessToken, id]);

  return (
    <div className="max-w-[800px] mx-auto bg-white px-10 pt-4 pb-14 mb-10">
      <div className="title text-center text-green-600 text-2xl font-semibold">Đặt Hàng Thành Công</div>
      <div className="title text-center">Cảm ơn bạn đã mua hàng tại HTS Store.</div>
      <div className="bg-slate-200 px-5 py-2">
        <div className=""> Đơn Hàng # {bill._id}</div>
        <div className="receiver  flex gap-4">
          <span className="font-semibold  min-w-36"> - Người đặt hàng:</span> {name}
        </div>
        <div className="addressShiping flex gap-4">
          <span className="font-semibold  min-w-36">- Địa chỉ nhận hàng :</span> {bill.addressShiping ?? ''}
        </div>
        <div className=" flex gap-4">
          <span className="font-semibold  min-w-36"> - Tổng Tiền: </span>
          <span className="text-red-600 font-semibold"> {formatCurrency(bill.total as any)}đ</span>
        </div>

        <div className="receiver  flex gap-4">
          <span className="font-semibold  min-w-36"> - Đơn vị vận chuyển :</span> Giao Hàng Nhanh (GHN)
        </div>

        <div className="receiver  flex gap-4">
          <span className="font-semibold  min-w-36"> - Mã giao hàng :</span> {bill.CodeShipGHN ?? ''}
        </div>
      </div>
      <div className="my-2">Thông Tin về Sản Phẩm</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Sản Phẩm</TableHead>

            <TableHead className="text-center">Số Lượng</TableHead>
            <TableHead className="text-center">Giá Tiền</TableHead>
            {/*<TableHead className="text-center">Tổng Tiền</TableHead>*/}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bill?.itemArr?.length > 0 &&
            bill?.itemArr?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">{formatCurrency(item.price as any)}đ</TableCell>
                  <TableCell className="text-center">
                    {formatCurrency((Number(item.price) * Number(item.quantity)) as any)}đ
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>

            <TableHead></TableHead>
            <TableHead className="text-red-600 font-semibold">Tổng Số Tiền</TableHead>
            <TableHead className="text-red-600 font-semibold">{formatCurrency(bill.total as any)}đ</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Bill;
