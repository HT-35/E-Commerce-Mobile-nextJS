/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';

const FormProfile = () => {
  const info = useAppSelector((state: any) => state.account);
  console.log(`info:`, info);

  const [name, setName] = useState(info.name || '');
  const [email, setEmail] = useState(info.email || '');
  const [phone, setPhone] = useState(info.phone || '');
  const [address, setAddress] = useState(info.address || '');

  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      //fileInputRef.current.click();
    }
  };

  // Optional: Update local state if info from Redux changes (reloading profile)
  useEffect(() => {
    setName(info.name || '');
    setEmail(info.email || '');
    setPhone(info.phone || '');
    setAddress(info.address || '');
  }, [info]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:items-start">
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <Input type="email" placeholder="Email" value={email} className="mt-2 mb-2" onChange={(e) => setEmail(e.target.value)} />
          <Input type="text" placeholder="Tên" value={name} className="mt-2 mb-2" onChange={(e) => setName(e.target.value)} />
          <Input type="number" placeholder="Số điện thoại" value={phone} className="mt-2 mb-2" onChange={(e) => setPhone(e.target.value)} />
          <Input type="email" placeholder="Địa chỉ" value={address} className="mt-2 mb-2" onChange={(e) => setAddress(e.target.value)} />
          <Button className="bg-[#dc0000] text-white">Lưu</Button>
        </div>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src="https://shopee-clone-reactjs.vercel.app/assets/user.bd6b3c66.svg"
                alt="user"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <Input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png" />
            <Button
              onClick={handleFileClick}
              className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
            >
              Chọn ảnh
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
