'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Next_Server } from '@/utils/listApi';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/price';

interface bill {
  _id: string;
  total: number;
  numberPhone: string;
  email: string;
  addressShiping: string;
  itemArr: any[];
  statusShiping: string;
  statusPayment: string;
  paymentMethod: string;
}

const OrderPage = () => {
  const [bill, setBill] = useState<bill[]>([]);
  const { _id, accessToken } = useAppSelector((item) => item.account);

  const [screenHeight, setScreenHeight] = useState<number>(0);
  useEffect(() => {
    setScreenHeight(Number(window.innerHeight - 160));
  }, [screenHeight]);

  useEffect(() => {
    const getUser = async () => {
      if (accessToken && _id) {
        const res: any = await sendRequest<IBackendRes<IUser>>({
          method: 'GET',

          url: listApi_Next_Server.detailUser(_id!),
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('');
        console.log('');
        console.log('res : ', res);
        console.log('');
        console.log('');
        console.log('');
        const arrBill = res?.data?.Bill?.map((item: any) => {
          return {
            _id: item._id,
            total: item.total,
            numberPhone: item.numberPhone,
            email: item.email,
            addressShiping: item.addressShiping,
            itemArr: item.itemArr,
            statusShiping: item.statusShiping,
            statusPayment: item.statusPayment,
            paymentMethod: item.paymentMethod,
          };
        });
        //console.log('arrBill', arrBill);
        setBill(arrBill);
      }
    };
    getUser();
  }, [_id, accessToken]);

  return (
    <div
      className="overflow-x-auto max-sm:w-[400px]  max-md:w-[650px] max-lg:w-[900px]"
      style={{ height: `${screenHeight - 20}px` }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>

            <TableHead className="text-center min-w-[150px]">Địa chỉ giao hàng</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Số Điện Thoại</TableHead>
            <TableHead className="text-center min-w-[200px]">Sản Phẩm</TableHead>
            <TableHead className="text-center">Tổng Tiền</TableHead>
            <TableHead className="text-center">Hình Thức Thanh Toán</TableHead>
            <TableHead className="text-center">Trạng Thái Đơn Hàng</TableHead>
            <TableHead className="text-center">Trạng Thái Giao Hàng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bill?.length > 0 &&
            bill?.map((item, index) => {
              console.log(`item:`, item);
              return (
                <TableRow key={index} className="border-b-black">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center min-w-[150px]">{item?.addressShiping}</TableCell>
                  <TableCell className="text-center">{item?.email}</TableCell>
                  <TableCell className="text-center">{item?.numberPhone}</TableCell>
                  <TableCell className="text-center min-w-[200px]">
                    {item?.itemArr.map((item, index) => {
                      return (
                        <div key={index} className="mb-3">
                          <div className="text-left">Sản Phẩm : {item.name}</div>
                          <div className="text-left">Màu Sắc : {item.color}</div>
                          <div className="text-left">Số Lượng : {item.quantity}</div>
                          <div className="text-left">Giá Tiền : {formatCurrency(item.price as any)}đ</div>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {/*{formatCurrency((Number(item?.itemArr?.price) * Number(item?.itemArr?.quantity)) as any)}đ*/}
                    {formatCurrency(item?.total as any)}đ
                  </TableCell>
                  <TableCell className="text-center">{item?.statusShiping}</TableCell>
                  <TableCell className="text-center">{item?.statusPayment}</TableCell>
                  <TableCell className="text-center">{item?.paymentMethod}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderPage;
