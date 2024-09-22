'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CartIcon, IconSearch, UserIcon } from '@/components/icons';
import { ListBulletIcon } from '@radix-ui/react-icons';
import ButtonMenu from '@/components/ui/ButtonMenu';
import Link from 'next/link';

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false); // useState luôn được gọi

  useEffect(() => {
    setIsMounted(true); // Chỉ định rằng component đã mount
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches);
    };

    // Đặt giá trị ban đầu
    setIsLargeScreen(mediaQuery.matches);

    // Lắng nghe sự kiện thay đổi kích thước màn hình
    mediaQuery.addEventListener('change', handleResize);

    // Hủy lắng nghe sự kiện khi component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []); // useEffect vẫn được gọi mà không phụ thuộc vào isMounted

  if (!isMounted) return null; // Chỉ render sau khi component đã mount

  return (
    <>
      {isLargeScreen ? (
        <div className="flex justify-between items-center py-2 text-white text-xs fixed w-full bg-[#DD0000] px-8 font-medium mb-20 z-50">
          <Link href={'/'}>
            <div className="logo text-xl cursor-pointer">HTS Store</div>
          </Link>
          <div className="search relative w-full max-2xl:max-w-[20%] 2xl:max-w-[350px]">
            <Input
              className="pr-10  placeholder:text-white focus:placeholder:text-transparent  focus:outline-none focus:border-0 focus:ring-1 focus:ring-ring"
              placeholder="Bạn tìm gì ..."
            ></Input>
            <div className="absolute top-[50%] -translate-y-[50%] right-2">
              <IconSearch></IconSearch>
            </div>
          </div>

          <Link href={'/product'}>
            <div className="guarantee flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
              <ListBulletIcon className="w-7 h-7"></ListBulletIcon>
              <div>
                <div className="">Sản Phẩm</div>
              </div>
            </div>
          </Link>

          <Link href={'/cart'}>
            <div className="cart flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
              <CartIcon /> Giỏ Hàng
            </div>
          </Link>

          <div className="account flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
            <UserIcon></UserIcon>
            <div>
              <div className="">Tài Khoản</div>
              <div className="">Đơn Hàng</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:hidden py-1 text-white text-xs fixed w-full bg-[#DD0000] px-2 font-medium mb-20 z-50">
          <div className="flex justify-between items-center">
            <Link href={'/'}>
              <div className="logo text-sm cursor-pointer">HTS Store</div>
            </Link>
            <div className="cart flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer text-xs">
              <CartIcon /> Giỏ Hàng
            </div>
            <div className="account flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
              <UserIcon></UserIcon>
              <div>
                <div className="">Tài Khoản</div>
                <div className="">Đơn Hàng</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div className="search relative w-full basis-5/6">
              <Input
                className="pr-10 w-full placeholder:text-white"
                placeholder="Bạn tìm gì ..."
              ></Input>
              <div className="absolute top-[50%] -translate-y-[50%] right-2 basis-1/6">
                <IconSearch></IconSearch>
              </div>
            </div>
            <div className="menu">
              <ButtonMenu></ButtonMenu>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
