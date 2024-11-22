'use client';
import React from 'react';
import { CubeIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
const DashboardAdmin = () => {
  return (
    <div className=" grid grid-cols-2 max-lg:grid-cols-1 gap-2 flex-wrap  p-4">
      <div className="totalOrder flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44 ">
        <div className="icon flex justify-start items-center gap-4">
          <CubeIcon className="h-6 w-6"></CubeIcon>
          <div className="p font-bold">Đơn Hàng Mới</div>
        </div>
        <div className="number">10 đơn hàng</div>
      </div>

      <div className="codOrder flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44">
        <div className="icon flex justify-start items-center gap-4">
          <CubeIcon className="h-6 w-6"></CubeIcon>
          <div className="p font-bold">Tổng Đơn Hàng</div>
        </div>
        <div className="number">12 đơn hàng</div>
      </div>

      <div className="paymentOrder flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44">
        <div className="icon flex justify-start items-center gap-4">
          <p className="h-6 w-6">$</p>
          <div className=" font-bold gap-4">
            <p>Doanh Thu</p>
          </div>
        </div>
        <div className="number">100,000,000 triệu</div>
      </div>

      <div className="messageWaitingForReply flex flex-col gap-4  justify-between p-4 bg-[#F4F6F8] rounded-lg xl:min-w-44">
        <div className="icon flex justify-start items-center gap-4">
          <ChatBubbleIcon className="h-6 w-6"></ChatBubbleIcon>
          <div className="p font-bold">Tin Nhắn Mới</div>
        </div>
        <div className="number">10 tin nhắn</div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
