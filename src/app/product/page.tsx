/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
'use client';
import { SelectForm } from '@/app/product/Filter';
import Navigation from '@/components/navigation/Navigation';
import Title from '@/components/title/Title';
import { Button } from '@/components/ui/button';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useAppSelector } from '@/lib/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Scrollbar } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/fetchApi';
import { formatPrice } from '@/utils/index';

// import {sendRequest} from '@/'
const subBanner = [
  {
    index: 1,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/c9/a3/c9a39b68eaf6efbb34033827e954728c.jpg',
  },
  {
    index: 2,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/f3/ba/f3baa27a529101c3c8cd65c5fe065430.jpg',
  },
];
const Banner = [
  {
    index: 1,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/c9/a3/c9a39b68eaf6efbb34033827e954728c.jpg',
  },
  {
    index: 2,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/f3/ba/f3baa27a529101c3c8cd65c5fe065430.jpg',
  },
  {
    index: 3,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/40/ab/40ab1ffa1f612eb67fc877c8b32a8582.png',
  },
];

export const ListBrand = [
  {
    brand: 'Tất Cả',
  },
  {
    brand: 'iPhone',
    //img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/92/e5/92e5003382a0bada9a770618b6c6099b.png',
  },
  {
    brand: 'Samsung',
    //img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/31/ce/31ce9dafafac121361ee7cbd313ae76b.png',
  },
  {
    brand: 'Xiaomi',
    //img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/e6/02/e602583e5e16acedfe54ab41b08b5d4f.png',
  },
  {
    brand: 'Oppo',
    //img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/b6/26/b62674c18cc7ec4de1de3670812af13d.png',
  },
];

const ProductPage = () => {
  const [productList, setProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Thêm state để lưu trữ thứ tự sắp xếp
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const res = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: 'localhost:3000/api/product?current=1&pageSize=10',
        method: 'GET',
      });
      setProductList(res?.data?.result);
    };
    res();
  }, []);

  // Hàm xử lý sắp xếp
  const handleSort = (order: any) => {
    setSortOrder(order);
    const sortedProducts = [...productList].sort((a: any, b: any) => {
      const priceA = parseFloat(a.option[0].price.replace(/\./g, ''));
      const priceB = parseFloat(b.option[0].price.replace(/\./g, ''));
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    setProductList(sortedProducts);
  };

  // Handle brand filter
  const handleBrandFilter = async (brand: any) => {
    console.log(brand);

    setSelectedBrand(brand); // Update selected brand
    const res = await sendRequest<IBackendRes<any>>({
      url: `localhost:4000/product/brand/${brand.toLowerCase()}`,
      method: 'GET',
    });
    setProductList(res.data);
    console.log('');
    console.log('');
    console.log('res.data  :  ', res.data);
    console.log('');
    console.log('');
    console.log('');
  };

  return (
    <div className="min-h-[10000px] overflow-x-hidden  max-lg:banner  ">
      <Navigation
        menu={false}
        Banner={Banner}
        subBanner={subBanner}
      ></Navigation>
      <Title className="mt-5  ">Hãng Điện Thoại</Title>

      <div className=" min-h-[30px] max-lg:min-h-[20px]">
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          breakpoints={{
            1024: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
          className="mySwiper bg-transparent"
        >
          {ListBrand.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Button
                  className={`  hover:bg-slate-100 border-[1px] border-slate-400  ${selectedBrand === item?.brand ? 'bg-slate-100 text-black' : 'bg-white text-black'}`}
                  onClick={() => handleBrandFilter(item?.brand)}
                >
                  {/*{item?.img ? <img src={item?.img} alt={item?.brand} className="" /> : <p className="text-black">{item?.brand}</p>}*/}
                  {/*<p className="text-black">{item?.brand}</p>*/}
                  {item?.brand}
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="flex justify-start items-center  my-4   ">
        <div className="">
          <Title className=" lg:min-w-32">Bộ Lọc</Title>
        </div>
        <div className=" w-full">
          <SelectForm></SelectForm>
        </div>
      </div>

      <div className="flex justify-start items-center gap-3 my-4">
        <div className="min-w-32">
          <Title className=" ">Sắp Xếp</Title>
        </div>
        <div className="filter price flex justify-between items-center gap-4">
          <Button
            className={`px-4 py-1 border-[1px] border-slate-400 text-center rounded-lg bg-white text-black hover:bg-[#F3F4F6] 
              ${sortOrder === 'desc' ? 'bg-[#F3F4F6]' : 'bg-white'}
              `}
            onClick={() => handleSort('desc')}
          >
            Giá Từ Cao Đến Thấp
          </Button>
          <Button
            className={`px-4 py-1 border-[1px] border-slate-400 text-center rounded-lg bg-white text-black hover:bg-[#F3F4F6] 
              ${sortOrder === 'asc' ? 'bg-[#F3F4F6]' : 'bg-white'}
              `}
            onClick={() => handleSort('asc')}
          >
            Giá Từ Thấp Đến Cao
          </Button>
        </div>
      </div>

      {/* Product */}

      {/*<div className="product grid grid-cols-4  w-full h-full gap-8 my-4   max-lg:grid-cols-2  max-lg:gap-2">
        {productList.map((item: any, index) => {
          return (
            <div key={index} className="product rounded-lg bg-white pt-1">
              <Link href={'/product/' + item?.slug}>
                <div className="img flex items-center justify-center  min-h-[200px]">
                  <Image
                    src={item?.option[0]?.img[0]?.link}
                    alt="smart-phone"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className={`w-full h-auto rounded-lg max-w-[200px]`}
                    priority
                  ></Image>
                </div>
              </Link>
              <div className="title px-4 py-2 text-xs">
                <Link href={'/product/' + item?.slug}>
                  <div className="title font-semibold min-h-10 text-xs">{item?.name}</div>
                </Link>
                <div className="price font-semibold text-red-600 min-h-8">{formatPrice(item?.option[0].price)}đ</div>
                <div className="text-[10px] p-2 border-2 rounded-lg bg-[#F3F4F6] ">
                  Giảm đến 500K khi trả góp thẻ tín dụng Sacombank qua cổng MPOS
                </div>
                <div className="like flex justify-between my-2 mt-3 text-xs">
                  <div className="start my-2 text-lg flex ">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <StarFilledIcon key={index} color="#F59E0B" className="w-[18px] h-[18px] max-lg:w-[10px]"></StarFilledIcon>
                      ))}
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-[12px]">Yêu Thích </span>
                    <StarIcon color="#F59E0B" className="w-[18px] h-[18px] max-lg:w-[10px]"></StarIcon>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>*/}

      <div className="product grid grid-cols-4 w-full h-full gap-8 my-4 max-lg:grid-cols-2 max-lg:gap-2">
        {productList.map((item: any, index) => {
          const productImage =
            item?.option?.[0]?.img?.[0]?.link ?? '/placeholder-image.jpg'; // Ảnh fallback
          const productPrice = item?.option?.[0]?.price ?? 0;
          const productSlug = item?.slug ?? '';
          const productName = item?.name ?? 'Sản phẩm không có tên';

          return (
            <div key={index} className="product rounded-lg bg-white pt-1">
              {/* Link tới trang sản phẩm */}
              <Link href={`/product/${productSlug}`}>
                <div className="img flex items-center justify-center min-h-[200px]">
                  <Image
                    src={productImage}
                    alt="smart-phone"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto rounded-lg max-w-[200px]"
                    priority
                  />
                </div>
              </Link>

              {/* Chi tiết sản phẩm */}
              <div className="title px-4 py-2 text-xs">
                <Link href={`/product/${productSlug}`}>
                  <div className="title font-semibold min-h-10 text-xs">
                    {productName}
                  </div>
                </Link>
                <div className="price font-semibold text-red-600 min-h-8">
                  {formatPrice(productPrice)}đ
                </div>
                <div className="text-[10px] p-2 border-2 rounded-lg bg-[#F3F4F6]">
                  Giảm đến 500K khi trả góp thẻ tín dụng Sacombank qua cổng MPOS
                </div>

                {/* Đánh giá và yêu thích */}
                <div className="like flex justify-between my-2 mt-3 text-xs">
                  <div className="start my-2 text-lg flex">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <StarFilledIcon
                          key={index}
                          color="#F59E0B"
                          className="w-[18px] h-[18px] max-lg:w-[10px]"
                        />
                      ))}
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-[12px]">Yêu Thích</span>
                    <StarIcon
                      color="#F59E0B"
                      className="w-[18px] h-[18px] max-lg:w-[10px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;

///////
