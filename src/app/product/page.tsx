/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
'use client';
import { SelectForm } from '@/app/product/Filter';
import Navigation from '@/components/navigation/Navigation';
import Title from '@/components/title/Title';
import { Button } from '@/components/ui/button';
import Footer from '@/components/footer/footer';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/fetchApi';
import { formatPrice } from '@/utils/index';
import { listApi_Nest_Server_API_Route, listApi_Next_Server } from '@/utils/listApi';
import { useSearchParams } from 'next/navigation';

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

const ListBrand: any = [
  {
    brand: 'Tất Cả',
  },
  {
    brand: 'APPLE',
  },
  {
    brand: 'SAMSUNG',
  },
  {
    brand: 'XIAOMI',
  },
  {
    brand: 'OPPO',
  },
];

const ProductPage = () => {
  const searchParams = useSearchParams();
  const searchBrand = searchParams.get('brand') || '';
  const [productList, setProductList] = useState([]);
  const [filterProductList, setFilterProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Thêm state để lưu trữ thứ tự sắp xếp
  const [selectedBrand, setSelectedBrand] = useState(searchBrand);

  const [filter, setFilter] = useState<{
    RAM: string;
    ROM: string;

    OS: string;
  }>({
    RAM: '',
    ROM: '',
    OS: '',
  });

  useEffect(() => {
    if (searchBrand !== '') {
      const res = async () => {
        const res = await sendRequest<IBackendRes<any>>({
          url: listApi_Nest_Server_API_Route.getProductByBrandToLowerCase(searchBrand),
          method: 'GET',
        });
        setProductList(res.data);
      };
      res();
    } else {
      const res = async () => {
        const res = await sendRequest<IBackendRes<any>>({
          url: listApi_Next_Server.getAllProduct(),
          method: 'GET',
        });
        setProductList(res?.data?.result);
      };
      res();
    }
  }, [searchBrand]);

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
    if (brand === 'Tất Cả') {
      setSelectedBrand(brand); // Update selected brand
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Next_Server.getAllProduct(),
        method: 'GET',
      });
      setProductList(res?.data?.result);
    } else {
      setSelectedBrand(brand); // Update selected brand
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Nest_Server_API_Route.getProductByBrandToLowerCase(brand),
        method: 'GET',
      });
      setProductList(res.data);
    }
  };

  useEffect(() => {
    const newProductFilter =
      productList.length > 0 &&
      productList
        ?.filter((item: any) => {
          // Khởi tạo biến kiểm tra
          let isValid = true;

          // Kiểm tra RAM
          if (filter.RAM !== '') {
            const splitRam = item?.ram?.toLowerCase()?.split(' ') ?? [''];
            if (
              item.ram.toLowerCase() !== filter.RAM.toLowerCase() &&
              filter.RAM.toLowerCase() !== `${splitRam[0]}gb`
            ) {
              isValid = false;
            }
          }

          // Kiểm tra ROM
          if (filter.ROM !== '') {
            const splitRom = item?.rom?.toLowerCase()?.split(' ');
            if (
              item.rom.toLowerCase() !== filter.ROM.toLowerCase() &&
              filter.ROM.toLowerCase() !== `${splitRom[0]}gb`
            ) {
              isValid = false;
            }
          }

          // Kiểm tra OS
          if (filter.OS !== '') {
            const splitOS = item?.OS?.toLowerCase()?.split(' ') ?? [''];
            if (item.os.toLowerCase() !== filter.OS.toLowerCase() && filter.OS.toLowerCase() !== `${splitOS[0]}`) {
              isValid = false;
            }
          }

          // Trả về kết quả kiểm tra
          return isValid;
        })
        .filter((item) => item); // Loại bỏ null khỏi mảng

    setFilterProductList(newProductFilter as any);

    console.log('newProductFilter  ', newProductFilter);
    console.log('filter details: ', filter);
  }, [filter, productList]);

  return (
    <div className="overflow-x-hidden  max-lg:banner  ">
      <Navigation menu={false} Banner={Banner} subBanner={subBanner}></Navigation>

      <div className="mt-5   flex items-center justify-start">
        <Title className="lg:min-w-14">Hãng Điện Thoại</Title>
        <div className=" min-h-[30px] max-lg:min-h-[20px] flex justify-start gap-20">
          {ListBrand?.length > 0 &&
            ListBrand?.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <Button
                    className={`  hover:bg-slate-100 border-[1px] border-slate-400  
                      ${selectedBrand === item?.brand || (item?.brand === 'Tất Cả' && selectedBrand === '') ? 'bg-slate-100 text-black' : 'bg-white text-black'}`}
                    onClick={() => handleBrandFilter(item?.brand)}
                  >
                    {item?.brand}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex justify-start items-center  my-4   ">
        <div className="">
          <Title className=" lg:min-w-32">Bộ Lọc</Title>
        </div>
        <div className=" w-full">
          <SelectForm setFilter={setFilter}></SelectForm>
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

      <div className="product grid grid-cols-4 w-full h-full gap-8 my-4 max-lg:grid-cols-2 max-lg:gap-2">
        {filter?.OS === '' &&
          filter?.RAM === '' &&
          filter?.ROM === '' &&
          filterProductList?.length === 0 &&
          productList?.length > 0 &&
          productList?.map((item: any, index) => {
            const productImage = item?.option?.[0]?.img?.[0]?.link ?? '/placeholder-image.jpg'; // Ảnh fallback
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
                    <div className="title font-semibold min-h-10 text-xs">{productName}</div>
                  </Link>
                  <div className="price font-semibold text-red-600 min-h-8">{formatPrice(productPrice)}đ</div>
                  <div className="text-[10px] p-2 border-2 rounded-lg bg-[#F3F4F6]">
                    Giảm đến 500K khi trả góp thẻ tín dụng Sacombank qua cổng MPOS
                  </div>

                  {/* Đánh giá và yêu thích */}
                  <div className="like flex justify-between my-2 mt-3 text-xs">
                    <div className="start my-2 text-lg flex">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <StarFilledIcon key={index} color="#F59E0B" className="w-[18px] h-[18px] max-lg:w-[10px]" />
                        ))}
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="text-[12px]">Yêu Thích</span>
                      <StarIcon color="#F59E0B" className="w-[18px] h-[18px] max-lg:w-[10px]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {filterProductList?.length > 0 &&
          filterProductList?.map((item: any, index) => {
            const productImage = item?.option?.[0]?.img?.[0]?.link ?? '/placeholder-image.jpg'; // Ảnh fallback
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
                    <div className="title font-semibold min-h-10 text-xs">{productName}</div>
                  </Link>
                  <div className="price font-semibold text-red-600 min-h-8">{formatPrice(productPrice)}đ</div>
                  <div className="text-[10px] p-2 border-2 rounded-lg bg-[#F3F4F6]">
                    Giảm đến 500K khi trả góp thẻ tín dụng Sacombank qua cổng MPOS
                  </div>

                  {/* Đánh giá và yêu thích */}
                  <div className="like flex justify-between my-2 mt-3 text-xs">
                    <div className="start my-2 text-lg flex">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <StarFilledIcon key={index} color="#F59E0B" className="w-[18px] h-[18px] max-lg:w-[10px]" />
                        ))}
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="text-[12px]">Yêu Thích</span>
                      <StarIcon color="#F59E0B" className="w-[18px] h-[18px] max-lg:w-[10px]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

///////
