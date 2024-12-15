'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CartIcon, IconSearch, UserIcon } from '@/components/icons';
import { ListBulletIcon } from '@radix-ui/react-icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import ButtonMenu from '@/components/ui/ButtonMenu';
import Link from 'next/link';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Nest_Server_API_Route, listApi_Next_Server } from '@/utils/listApi';
import Image from 'next/image';
import { formatCurrency } from '@/utils/price';
import { motion } from 'framer-motion';

import { useDebounce } from '@uidotdev/usehooks';
import { cn } from '@/lib/utils';

interface ITypeProduct {
  slug: string;
  name: String;
  price: String;
  img: string;
}

const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const info = useAppSelector((state: any) => state.account);
  const isLoggedIn = info?.name; // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const { name } = useAppSelector((state: any) => state.account);
  const data = useAppSelector((state: any) => state.account);

  const [nameProduct, setNameProduct] = useState<string>('');
  const debouncedSearchTerm = useDebounce(nameProduct, 100);
  const [arrProduct, setArrProduct] = useState<ITypeProduct[]>([]);

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

  useEffect(() => {
    if (nameProduct !== '' && debouncedSearchTerm !== '') {
      const getProduct = async () => {
        const product = await sendRequest<IBackendRes<any>>({
          method: 'GET',
          url: listApi_Next_Server.searchProduct(debouncedSearchTerm),
        });
        if (product?.data?.length > 0) {
          const arrProduct: ITypeProduct[] = product?.data?.map((item: any) => {
            return {
              slug: item?.slug,
              name: item?.name,
              price: item?.option[0]?.price,
              img: item?.option[0]?.img[0].link,
            };
          });
          setArrProduct(arrProduct);
        } else {
          setArrProduct([]);
        }
      };
      getProduct();
    } else {
      setArrProduct([]);
    }
  }, [debouncedSearchTerm, nameProduct]);

  return (
    <>
      {isLargeScreen ? (
        <div className="flex justify-between items-center py-2 text-white fixed w-full bg-[#DD0000] px-8 font-medium mb-20 z-50 text-xl">
          <Link href={'/'}>
            <div className="logo text-xl cursor-pointer">HTS Store</div>
          </Link>

          <div className="search relative w-full max-xl:max-w-[20%] xl:max-w-[500px]">
            <div className="">
              <Input
                className="pr-10 placeholder:text-white focus:placeholder:text-transparent  focus:outline-none focus:border-0 focus:ring-1 focus:ring-ring"
                placeholder="Bạn tìm gì ..."
                onChange={(e) => setNameProduct(e.target.value)}
                value={nameProduct}
                onFocus={() => setIsOpen(true)} // Mở danh sách khi focus
                onBlur={() => setIsOpen(false)} // Đóng khi mất focus
              ></Input>
              <div className="absolute top-[50%] -translate-y-[50%] right-2">
                <IconSearch />
              </div>
            </div>

            <motion.div
              initial={{ height: 0 }}
              animate={{ height: nameProduct !== '' ? '500px' : 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute w-full h-96 bg-white mt-[15px] rounded-sm overflow-hidden text-black text-sm 
              overflow-y-auto  shadow-2xl
              "
            >
              {nameProduct !== '' && arrProduct?.length === 0 ? (
                <div className="p-4">Không tìm thấy sản phẩm {nameProduct}</div>
              ) : (
                arrProduct.length > 0 &&
                arrProduct?.map((item, index) => (
                  <Link href={`/product/${item.slug}`} key={index} onClick={(e) => setNameProduct('')}>
                    <div className="flex justify-start gap-4 p-4">
                      <Image
                        src={item.img}
                        quality={50}
                        width={500}
                        height={500}
                        alt=""
                        className="max-w-[100px] max-h-[120px] rounded-sm"
                      ></Image>
                      <div>
                        <div>{item.name}</div>
                        <div className="text-red-600 font-semibold">{item.price.toLocaleString()} ₫</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </motion.div>
          </div>

          <Link href={'/product'}>
            <div
              className="guarantee flex justify-between items-center gap-2 hover:bg-white hover:bg-opacity-50 p-2 rounded-md cursor-pointer
            "
            >
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
                {name.length > 0 ? <>{name}</> : <>Đăng Nhập</>}
              </div>
            </Link>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div className="search relative w-full basis-5/6">
              <div className="">
                {/*<Input
                  className="pr-10 w-full placeholder:text-white"
                  placeholder="Bạn tìm gì ..."
                  onChange={(e) => setNameProduct(e.target.value)}
                />
                <div className="absolute top-[50%] -translate-y-[50%] right-2 basis-1/6">
                  <IconSearch />
                </div>*/}

                <div className="">
                  <Input
                    className="pr-10 placeholder:text-white focus:placeholder:text-transparent  focus:outline-none focus:border-0 focus:ring-1 focus:ring-ring"
                    placeholder="Bạn tìm gì ..."
                    onChange={(e) => setNameProduct(e.target.value)}
                    value={nameProduct}
                    onFocus={() => setIsOpen(true)} // Mở danh sách khi focus
                    onBlur={() => setIsOpen(false)} // Đóng khi mất focus
                  ></Input>
                  <div className="absolute top-[50%] -translate-y-[50%] right-2">
                    <IconSearch />
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: nameProduct !== '' ? '500px' : 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute w-full h-96 bg-white mt-[15px] rounded-sm overflow-hidden text-black text-sm 
              overflow-y-auto  shadow-2xl
              "
                >
                  {nameProduct !== '' && arrProduct?.length === 0 ? (
                    <div className="p-4">Không tìm thấy sản phẩm {nameProduct}</div>
                  ) : (
                    arrProduct?.length > 0 &&
                    arrProduct?.map((item, index) => (
                      <Link href={`/product/${item.slug}`} key={index} onClick={(e) => setNameProduct('')}>
                        <div className="flex justify-start gap-4 p-4">
                          <Image
                            src={item.img}
                            quality={50}
                            width={500}
                            height={500}
                            alt=""
                            className="max-w-[100px] max-h-[120px] rounded-sm"
                          ></Image>
                          <div>
                            <div>{item.name}</div>
                            <div className="text-red-600 font-semibold">{item.price.toLocaleString()} ₫</div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </motion.div>
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
