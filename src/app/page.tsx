'use client';

import Image from 'next/image';

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Navigation from '@/components/navigation/Navigation';

import ResponsiveBanner from '@/components/banner/BannerHome';
import Title from '@/components/title/Title';
import Footer from '@/components/footer/footer';
import ChatClient from '@/components/chatClient/ChatClient';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/fetchApi';
import { formatPrice } from '@/utils/index';
import { listApi_Next_Server } from '@/utils/listApi';

const brandArr = [
  { brand: 'APPLE', href: '/APPLE' },
  { brand: 'SAMSUNG', href: '/SAMSUNG' },
  { brand: 'XIAOMI', href: '/XIAOMI' },
  { brand: 'OPPO', href: '/OPPO' },

  { brand: 'Xem tất cả', href: '/product' },
];

const subBanner = [
  { index: 1, url: 'https://clickbuy.com.vn/uploads/media/637-UFYMP.png' },
  { index: 2, url: 'https://clickbuy.com.vn/uploads/media/610-glsVP.png' },
  { index: 3, url: 'https://clickbuy.com.vn/uploads/media/630-DgPyL.png' },
];

const Banner = [
  { index: 1, url: 'https://clickbuy.com.vn/uploads/media/639-ySdKf.png' },
  { index: 2, url: 'https://clickbuy.com.vn/uploads/media/640-tBIDM.png' },
  { index: 3, url: 'https://clickbuy.com.vn/uploads/media/636-ugZNo.png' },
  { index: 4, url: 'https://clickbuy.com.vn/uploads/media/617-KpqUC.png' },
  { index: 5, url: 'https://clickbuy.com.vn/uploads/media/631-ECeac.png' },
];

export default function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const res = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Next_Server.getAllProduct(),
        method: 'GET',
      });
      setProductList(res?.data?.result);
    };
    res();
  }, []);

  return (
    <div className="min-h-[1000px] overflow-x-hidden  banner p-1">
      {/* Navigator */}
      <Navigation menu subBanner={subBanner} Banner={Banner}></Navigation>
      {/* banner */}

      <div className="">
        <ResponsiveBanner></ResponsiveBanner>
      </div>

      {/* SmartPhone Nổi Bật Nhất */}
      <div className="my-6">
        <div className="title flex max-lg:justify-between  max-lg:items-center">
          <div className="font-bold text-xl px-2 py-1 lg:basis-2/5     max-lg:text-base">
            <Title> ĐIỆN THOẠI NỔI BẬT NHẤT</Title>
          </div>
          <div className="brand  flex justify-between items-center basis-3/5 max-lg:hidden ">
            {brandArr?.length > 0 &&
              brandArr?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`/product?brand=${item.brand}`}
                    className="px-2 py-1 border-2 rounded-lg bg-[#F3F4F6] dark:text-black"
                  >
                    {item.brand}
                  </Link>
                );
              })}
          </div>

          <Link href={'/product'} className="max-lg:text-xs text-blue-500 underline lg:hidden">
            Xem Tất Cả
          </Link>
        </div>

        <div className="product grid grid-cols-5  w-full h-full gap-8 my-4   max-lg:grid-cols-2  max-lg:gap-2">
          {productList?.length > 0 &&
            productList?.map((item: any, index) => {
              return (
                <Link href={`product/${item.slug}`} key={index}>
                  <div className="product shadow-lg rounded-lg bg-white pt-1">
                    <div className="img    flex items-center justify-center ">
                      <Image
                        src={item.option[0].img[0].link}
                        alt="smart-phone"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-1/2 h-1/2 rounded-lg"
                        priority
                      ></Image>
                    </div>

                    <div className="title px-4 py-2  text-xs">
                      <div className="title font-semibold min-h-14  text-xs">{item.name}</div>
                      <div className="price font-semibold text-red-600  min-h-8">
                        {formatPrice(item.option[0].price)}đ
                      </div>
                      <div className="text-[10px] p-2 border-2 rounded-lg bg-[#F3F4F6] ">
                        Giảm đến 500K khi trả góp thẻ tín dụng Sacombank qua cổng MPOS
                      </div>

                      <div className="like flex justify-between  my-2 mt-3  text-xs">
                        <div className="start my-2 text-lg flex ">
                          {Array(5)
                            .fill(null)
                            .map((_, index) => (
                              <StarFilledIcon
                                key={index}
                                color="#F59E0B"
                                //width="18px"
                                //height="18px"
                                className=" w-[18px] h-[18px] max-lg:w-[10px] "
                              ></StarFilledIcon>
                            ))}
                        </div>

                        <div className=" flex items-center gap-1 cursor-pointer">
                          <span className="text-[12px]">Yêu Thích </span>
                          <StarIcon color="#F59E0B" className=" w-[18px] h-[18px] max-lg:w-[10px] "></StarIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
