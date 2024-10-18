'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Purchase = ({ children }: { children: React.ReactNode }) => {
  const [activeStatus, setActiveStatus] = useState('Chờ xác nhận');
  const pathname = usePathname();

  const statuses = [
    { path: '/user/purchase/all', label: 'Tất cả'},
    { path: '/user/purchase/pending', label: 'Chờ xác nhận'},
    { path: '/user/purchase/', label: 'Đã xác nhận'},
    { path: '/user/purchase/', label: 'Đã giao hàng'},
    { path: '/user/purchase/', label: 'Chờ xác nhận'},
    { path: '/user/purchase/', label: 'Đã huỷ'},
  ];

  return (
    <div>
      <div className="flex gap-2">
      {statuses.map((item) => (
            <div
              key={item.path}
              className={`cursor-pointer px-4 py-1.5 whitespace-nowrap border border-[#eaedef] rounded-sm ${
                pathname === item.path ? 'bg-[#d70018] text-white' : 'bg-white'
              }`}
            >
              <div className="">
                {item.path ? (
                  <Link href={item.path} className={`${pathname === item.path ? '' : ''}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={`${pathname === item.path ? '' : ''}`}>
                    {item.label}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Purchase;
