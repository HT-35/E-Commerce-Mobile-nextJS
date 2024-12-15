'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route, listApi_Next_Server } from '@/utils/listApi';
import { formattedDate } from '@/utils/formattedDate';
import { formatCurrency } from '@/utils/price';

enum Role {
  all = 'all',
  user = 'user',
  admin = 'admin',
}

const ListOrder: {
  _id: string;
  orderDay: string;
  userName: string;
  product: string;
  total: string;
  paymentMethod: string;
  payment: string;
  orderStatus: string;
}[] = [
  {
    _id: '#1232132131',
    orderDay: '1/12/2024',
    userName: 'Huy Trần - 0343128733 - biên hòa, đồng nai',
    product: 'iphone 12',
    total: '12.000.000',
    paymentMethod: 'VNPAY',
    payment: 'Đã Thanh Toán',
    orderStatus: 'Đang Giao Hàng',
  },
  {
    _id: '#1232132131',
    orderDay: '11/12/2024',
    userName: 'Huy Trần - 0343128733 - biên hòa, đồng nai',
    product: 'iphone 12',
    total: '12.000.000',
    paymentMethod: 'VNPAY',
    payment: 'Đã Thanh Toán',
    orderStatus: 'Đang Giao Hàng',
  },
  {
    _id: '#1232132131',
    orderDay: '19/12/2024',
    userName: 'Huy Trần - 0343128733 - biên hòa, đồng nai',
    product: 'iphone 12',
    total: '12.000.000',
    paymentMethod: 'VNPAY',
    payment: 'Đã Thanh Toán',
    orderStatus: 'Đang Giao Hàng',
  },
];

interface IOrder {
  _id: string;
  orderDay: string;
  userName: string;
  email: string;
  numberPhone: string;
  product: string;
  total: string;
  paymentMethod: string;
  payment: string;
  orderStatus: string;
}

const MangegerOrder = () => {
  const router = useRouter();

  const [order, setOrder] = useState<IOrder[]>([]);

  const { accessToken } = useAppSelector((item) => item.account);

  const [screenHeight, setScreenHeight] = useState<number>(0);
  useEffect(() => {
    setScreenHeight(Number(window.innerHeight - 160));
  }, [screenHeight]);

  if (!accessToken) {
    router.push(`/auth?callback=/admin`);
  }

  useEffect(() => {
    const getAllOrder = async () => {
      const order = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Nest_Server_API_Route.getAdminGetAllOrder(),
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('');
      console.log('');
      console.log('order', order);
      console.log('');
      console.log('');
      console.log('');

      const arrOrder: IOrder[] = order?.data?.data?.map((item: any) => {
        return {
          _id: item.CodeShipGHN,
          orderDay: item.updatedAt,
          userName: item.orderer,
          email: item.email,
          numberPhone: item.numberPhone,
          product: item.itemArr,
          total: item.total,
          paymentMethod: item.paymentMethod,
          payment: item.statusPayment,
          orderStatus: item.statusShiping,
        };
      });
      setOrder(arrOrder);
    };
    getAllOrder();
  }, [accessToken]);

  console.log('');
  console.log('');
  console.log('');
  console.log('order  :  ', order);
  console.log('');
  console.log('');

  return (
    <div className="">
      <div className="line h-[1px] w-full bg-slate-600 my-2"></div>

      <div className="overflow-hidden overflow-y-auto " style={{ height: `${screenHeight - 30}px` }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Đơn Hàng</TableHead>

              <TableHead>Ngày Đặt</TableHead>
              <TableHead className="min-w-16">Khách Hàng</TableHead>
              <TableHead className="min-w-48">Email</TableHead>
              <TableHead className="min-w-14">Số Điện Thoại</TableHead>
              <TableHead className="min-w-52">Sản Phẩm</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Thanh Toán</TableHead>
              <TableHead>Trạng Thái Thanh Toán</TableHead>
              <TableHead>Trạng Thái Đơn Hàng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.length > 0 &&
              order?.map((item: any, index) => {
                return (
                  <TableRow key={index + 1} className="">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{formattedDate(item?.orderDay)}</TableCell>
                    <TableCell className="min-w-16">{item?.userName}</TableCell>
                    <TableCell className="min-w-48">{item?.email}</TableCell>
                    <TableHead className="min-w-14 text-black">{item.numberPhone}</TableHead>
                    <TableCell className="min-w-52">
                      {item.products?.length > 0 &&
                        item.product.map((item: any, index: number) => {
                          return (
                            <div className="mb-3" key={index}>
                              <div className="">{item.name}</div>
                              <div className="">Quantity: {item.quantity}</div>
                              <div className="">Price: {formatCurrency(item.price as any)} đ</div>
                            </div>
                          );
                        })}
                    </TableCell>
                    <TableCell>{formatCurrency(item.total as any)}đ </TableCell>
                    <TableCell>{item.paymentMethod}</TableCell>
                    <TableCell>{item.payment}</TableCell>
                    <TableCell>{item.orderStatus}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MangegerOrder;
