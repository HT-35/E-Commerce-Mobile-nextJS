'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CartIcon, IconSearch, UserIcon } from '@/components/icons';
import { ListBulletIcon } from '@radix-ui/react-icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import ButtonMenu from '@/components/ui/ButtonMenu';
import Link from 'next/link';

const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const info = useAppSelector((state: any) => state.account);
  const isLoggedIn = info?.name; // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const { name } = useAppSelector((state: any) => state.account);
  const data = useAppSelector((state: any) => state.account);
  //console.log(`data:`, data);

  //console.log(`data:`, data);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = () => {
      setIsLargeScreen(mediaQuery.matches);
    };

    setIsLargeScreen(mediaQuery.matches);

    // Lắng nghe sự kiện thay đổi kích thước màn hình
    window.addEventListener('resize', handleResize);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <div className="flex justify-between items-center py-2 text-white fixed w-full bg-[#DD0000] px-8 font-medium mb-20 z-50 text-xl">
          <Link href={'/'}>
            <div className="logo text-xl cursor-pointer">HTS Store</div>
          </Link>
          <div className="search relative w-full max-2xl:max-w-[20%] 2xl:max-w-[350px]">
            <Input
              className="pr-10 placeholder:text-white focus:placeholder:text-transparent focus:outline-none focus:border-0 focus:ring-1 focus:ring-ring"
              placeholder="Bạn tìm gì ..."
            ></Input>
            <div className="absolute top-[50%] -translate-y-[50%] right-2">
              <IconSearch />
            </div>
          </div>

          <Link href={'/product'}>
            <div className="guarantee flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
              <ListBulletIcon className="w-7 h-7" />
              <div>Sản Phẩm</div>
            </div>
          </Link>

          <Link href={'/cart'}>
            <div className="cart flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
              <CartIcon /> Giỏ Hàng
            </div>
          </Link>

          <Link href={isLoggedIn ? '/user/profile' : '/auth'}>
            <div className="account flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
              <UserIcon />
              {name.length > 0 ? <>{name}</> : <>Đăng Nhập</>}
            </div>
          </Link>
        </div>
      ) : (
        <div className="lg:hidden py-1 text-white text-xs fixed w-full bg-[#DD0000] px-2 font-medium mb-20 z-50">
          <div className="flex justify-between items-center">
            <Link href={'/'}>
              <div className="logo text-sm cursor-pointer">HTS Store</div>
            </Link>

            <Link href={'/cart'}>
              <div className="cart flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer text-xs">
                <CartIcon /> Giỏ Hàng
              </div>
            </Link>

            <Link href={isLoggedIn ? '/user/profile' : '/auth'}>
              <div className="account flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer">
                <UserIcon />
                {name.length > 0 ? <>{name}</> : <>Login</>}
              </div>
            </Link>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div className="search relative w-full basis-5/6">
              <Input
                className="pr-10 w-full placeholder:text-white"
                placeholder="Bạn tìm gì ..."
              />
              <div className="absolute top-[50%] -translate-y-[50%] right-2 basis-1/6">
                <IconSearch />
              </div>
            </div>
            <div className="menu">
              <ButtonMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
