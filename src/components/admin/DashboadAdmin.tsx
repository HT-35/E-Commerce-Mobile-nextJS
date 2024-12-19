'use client';
import React, { useEffect, useState } from 'react';
import { CubeIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route } from '@/utils/listApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { IOrder } from '@/components/admin/MangegerOrder';
import { formatCurrency } from '@/utils/price';
const DashboardAdmin = () => {
  const { accessToken } = useAppSelector((item) => item.account);

  const [order, setOrder] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [message, setMessage] = useState<number>(0);

  useEffect(() => {
    const getAllOrder = async () => {
      const order = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Nest_Server_API_Route.getAdminGetAllOrder(),
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (order?.data?.data?.length) {
        setOrder(+order?.data?.data?.length > 0 ? order?.data?.data?.length : 0);
      }

      const arrOrder: number[] = order?.data?.data?.map((item: any) => item.total);

      if (arrOrder.length > 0) {
        const total = arrOrder.reduce((price, total) => {
          return price + total;
        });
        setTotal(+total);
      } else {
        setTotal(0);
      }
    };
    getAllOrder();

    const listCustomerChat = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Nest_Server_API_Route.employeeGetAllChat(),
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const listArrChat: [] = await res?.data
        ?.map((item: any, index: number) => {
          if (item.isWaitingForReply === true) {
            return item.isWaitingForReply;
          }
          return null;
        })
        .filter((item: any) => item !== null);

      setMessage(listArrChat.length);

      //setUserList(listArrChat);
    };
    listCustomerChat();
  }, [accessToken]);

  return (
    <div className=" grid grid-cols-2 max-lg:grid-cols-1 gap-2 flex-wrap  p-4 select-none ">
      <div className="codOrder flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44">
        <div className="icon flex justify-start items-center gap-4">
          <CubeIcon className="h-6 w-6"></CubeIcon>
          <div className="p font-bold">Tổng Đơn Hàng</div>
        </div>
        <div className="number flex gap-2">
          <p className="min-w-5">{order}</p> <p>đơn hàng</p>
        </div>
      </div>

      <div className="paymentOrder flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44">
        <div className="icon flex justify-start items-center gap-4">
          <p className="h-6 w-6">$</p>
          <div className=" font-bold gap-4">
            <p>Doanh Thu</p>
          </div>
        </div>
        <div className="number flex gap-2">
          {' '}
          {total > 0 ? (
            <div className="flex gap-2">
              <p className="min-w-24">{formatCurrency(total as any)}</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <p className="min-w-10">0</p>
              <p>VND</p>
            </div>
          )}
        </div>
      </div>

      <div className="messageWaitingForReply flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44">
        <div className="icon flex justify-start items-center gap-4">
          <ChatBubbleIcon className="h-6 w-6"></ChatBubbleIcon>
          <div className="p font-bold">Tin Nhắn Mới</div>
        </div>
        <div className="number flex gap-2">
          <p className="min-w-5">{message}</p> <p>tin nhắn</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
