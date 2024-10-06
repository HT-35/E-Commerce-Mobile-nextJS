import Image from 'next/image';

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Navigation from '@/components/navigation/Navigation';

import ResponsiveBanner from '@/components/banner/BannerHome';
import Title from '@/components/title/Title';
import Link from 'next/link';
import ChatClient from '@/components/chatClient/ChatClient';

const brandArr = [
  { brand: 'Apple', href: '/Apple' },
  { brand: 'Samsung', href: '/Samsung' },
  { brand: 'Xiaomi', href: '/Xiaomi' },
  { brand: 'OPPO', href: '/OPPO' },
  { brand: 'Nokia', href: '/Nokia' },
  { brand: 'Xem tất cả', href: '/product' },
];

const product = [
  {
    img: 'https://clickbuy.com.vn/uploads/pro/thumbs/galaxy-z-flip-6_207748.png?v=webp',
    title: 'Samsung Galaxy Z Flip6 (5G) 12GB 256GB Chính Hãng',
    price: '21.990.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/images/2023/09/iphone-15-pro-max-titan-1.png?v=webp',
    title: 'iPhone 15 Pro Max 256GB VN/A ',
    price: '28.490.000 ',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/pro/thumbs/xiaomi-14-ultra-chinh-hang_197730.jpeg?v=webp',
    title: 'Xiaomi 14 Ultra 16GB 512GB Chính Hãng',
    price: '26.990.000',
  },

  {
    img: 'https://clickbuy.com.vn/uploads/images/2022/03/ipad-5-4.jpg?v=webp',
    title: 'iPad Air 5 (2022) Wifi 64GB',
    price: '14.390.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/pro/thumbs/galaxy-z-flip-6_207748.png?v=webp',
    title: 'Samsung Galaxy Z Flip6 (5G) 12GB 256GB Chính Hãng',
    price: '21.990.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/images/2023/09/iphone-15-pro-max-titan-1.png?v=webp',
    title: 'iPhone 15 Pro Max 256GB VN/A ',
    price: '28.490.000 ',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/pro/thumbs/xiaomi-14-ultra-chinh-hang_197730.jpeg?v=webp',
    title: 'Xiaomi 14 Ultra 16GB 512GB Chính Hãng',
    price: '26.990.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/images/2022/03/ipad-5-4.jpg?v=webp',
    title: 'iPad Air 5 (2022) Wifi 64GB',
    price: '14.390.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/pro/thumbs/galaxy-z-flip-6_207748.png?v=webp',
    title: 'Samsung Galaxy Z Flip6 (5G) 12GB 256GB Chính Hãng',
    price: '21.990.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/images/2023/09/iphone-15-pro-max-titan-1.png?v=webp',
    title: 'iPhone 15 Pro Max 256GB VN/A ',
    price: '28.490.000 ',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/pro/thumbs/xiaomi-14-ultra-chinh-hang_197730.jpeg?v=webp',
    title: 'Xiaomi 14 Ultra 16GB 512GB Chính Hãng',
    price: '26.990.000',
  },
  {
    img: 'https://clickbuy.com.vn/uploads/images/2022/03/ipad-5-4.jpg?v=webp',
    title: 'iPad Air 5 (2022) Wifi 64GB',
    price: '14.390.000',
  },
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
  return (
    <div className="min-h-[1000px] overflow-x-hidden  banner formatPage">
      <div className="fixed bottom-5 right-4 z-[9999]">
        <ChatClient />
      </div>

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
            {brandArr.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
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

        <div className="product grid grid-cols-4  w-full h-full gap-8 my-4   max-lg:grid-cols-2  max-lg:gap-2">
          {product.map((item, index) => {
            return (
              <div key={index} className="product shadow-lg rounded-lg bg-white pt-1">
                <div className="img    flex items-center justify-center ">
                  <Image
                    src={item.img}
                    alt="smart-phone"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-autorounded-lg"
                    priority
                  ></Image>
                </div>

                <div className="title px-4 py-2  text-xs">
                  <div className="title font-semibold min-h-14  text-xs">{item.title}</div>
                  <div className="price font-semibold text-red-600  min-h-8">{item.price} đ</div>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
