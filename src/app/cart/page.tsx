'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppSelector } from '@/lib/redux/hooks';
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Cart = () => {

  // test Redux

  const info = useAppSelector((state: any) => state.account);
  console.log(`info:`, info);

  return (
    <div className="lg:m-4 m-2 min-h-[40px] relative bg-white rounded-lg lg:px-4 py-2 px-2 shadow-lg ">
      <div className="cart-header border-b border-[#e5e5e5] text-[#323232] p-2.5">
        <div className="go-back flex justify-between">
          <a>
            <ArrowLeftIcon className="w-7 h-7"></ArrowLeftIcon>
          </a>
          <p className="font-bold text-[18px]">Giỏ hàng của bạn</p>
          <p></p>
        </div>
      </div>
      <div className="flex flex-nowrap overflow-x-auto p-0 max-w-[800px] mt-4">
        <Button className="bg-[#d70018] text-white font-medium border border-white">
          Giỏ hàng
        </Button>
      </div>
      <div className="mt-3">
        <div className="listItemSuperCart ">
          <div className="mb-[20px]">
            <Checkbox className="mr-[6px]" />
            <label>Chọn tất cả</label>
          </div>
          {/* List Product */}
          <div className="bg-white border border-[rgba(145,158,171,0.239)] rounded-lg mb-5 p-2.5 relative">
            <div className="flex items-start justify-between min-h-[110px] py-2.5">
              <div className="checkbox-product relative w-1/4">
                <div className="flex">
                  <Checkbox />
                  <label>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-s24-ultra-xam_1_3.png"
                      className="w-[100px]"
                    ></img>
                  </label>
                </div>
              </div>
              <div className="product-info w-3/4">
                <div className="flex justify-between items-start max-lg:text-sm">
                  <p>Samsung Galaxy S24 Ultra 12GB 256GB-Xám</p>
                  <TrashIcon className="bg-transparent border-0 cursor-pointer p-0 z-10 w-6 h-7" />
                </div>
                <div className="flex justify-between  mt-[10px]">
                  <div className="price">
                    <p className="text-red-600/100 max-lg:text-sm">
                      25.990.000đ
                    </p>
                  </div>
                  <div className="">
                    <span className="bg-[#f3f3f3] rounded-sm cursor-pointer px-3 py-1.5">
                      -
                    </span>
                    <input
                      className="bg-transparent border-0 text-xs text-center w-[30px]"
                      defaultValue={1}
                    ></input>
                    <span className="bg-[#f3f3f3] rounded-sm cursor-pointer px-2.5 py-1.5">
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white border border-[rgba(145,158,171,0.239)] rounded-t-md shadow-[0_-4px_20px_-1px_rgba(40,124,234,0.15)] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] p-[10px_10px_15px] z-11">
        <div className="temp-info flex flex-col">
          <div className="price-temp">
            <p>
              Tổng tiền: <span className="text-red-600/100">0đ</span>
            </p>
          </div>
        </div>
        <Link href="cart/payment">
          <Button className="bg-[#d1041d]">Mua ngay</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
