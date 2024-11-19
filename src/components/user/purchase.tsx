'use client';
import React, { useState } from 'react';

const Purchase = () => {
  const [activeStatus, setActiveStatus] = useState('Chờ xác nhận');

  const statuses = [
    'Tất cả',
    'Chờ xác nhận',
    'Đã xác nhận',
    'Đang vận chuyển',
    'Đã giao hàng',
    'Đã huỷ'
  ];

  return (
    <div>
      <div className="flex gap-2">
        {statuses.map((status) => (
          <div
            key={status}
            className={`cursor-pointer px-4 py-1.5 whitespace-nowrap border border-[#eaedef] rounded-sm ${
              activeStatus === status ? 'bg-[#d70018] text-white' : 'bg-white'
            }`}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
