'use client';
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FormProfile = () => {

  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:items-start">
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <Input type="email" placeholder="Email" className="mt-2 mb-2" />
          <Input type="text" placeholder="Tên" className="mt-2 mb-2" />
          <Input
            type="number"
            placeholder="Số điện thoại"
            className="mt-2 mb-2"
          />
          <Input type="email" placeholder="Địa chỉ" className="mt-2 mb-2" />
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
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png"
            />
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
