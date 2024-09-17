'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ProfileForm } from '@/app/cart/payment/formInfo';
import Title from '@/components/title/Title';
import { Button } from '@/components/ui/button';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';

// Định nghĩa schema của form
export const formSchema = z.object({
  Email: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  PhoneNumber: z
    .string()
    .regex(/^0\d{9}$/, 'số điện thoại gồm 10 chữ số và bắt đầu bằng số 0'),
  address: z.string().nonempty('Vui lòng chọn địa chỉ nhận hàng '),
});

const Payment = () => {
  const [infoActive, setInfoActive] = useState(false);

  const [infoReceive, setInfoReceive] = useState({
    Email: 'huyfa352002@gmail.com',
    PhoneNumber: '0343128733',
    address: 'huyfa352002@gmail.com, huyfa352002@gmail.com',
  });

  enum payType {
    COD = 'COD',
    VNPAY = 'VNPAY',
  }
  const [pay, setPay] = useState<payType>(payType.VNPAY);

  // Sử dụng useForm tại đây
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: 'huytran.itvn@gmail.com',
      PhoneNumber: '0343128733',
      address: '',
    },
  });

  // Hàm handleSubmit để gọi từ button "Tiếp tục"
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setInfoActive(true); // Chuyển sang bước thanh toán
    setInfoReceive(values); // lưu thông tin nhận hàng vào state
  };

  const handleActivePayment = () => {
    form.handleSubmit(onSubmit)(); // Gọi submit form
  };

  return (
    <div>
      <div className="  min-h-[40px]   pb-28 ">
        <div className="cart-header border-b border-[#e5e5e5] text-[#323232] ">
          <div className="go-back flex justify-between">
            <Link href={'/cart'}>
              <ArrowLeftIcon className="w-7 h-7"></ArrowLeftIcon>
            </Link>
            <p className="font-bold text-[18px]">Thanh Toán</p>
            <p></p>
          </div>
        </div>
        <div className="flex gap-8  py-1">
          <div className="info text-center  basis-1/2">
            <Button
              className={`bg-transparent   font-bold shadow-none hover:bg-transparent ${infoActive ? ' text-slate-400' : 'text-red-500'}`}
              onClick={() => {
                setInfoActive(false);
              }}
            >
              1.THÔNG TIN
            </Button>
            <div
              className={`line w-full h-[3px] ${infoActive ? ' bg-slate-400' : ' bg-red-500'}`}
            ></div>
          </div>
          <div className="payment text-center text-slate-400 text-base basis-1/2">
            <Button
              className={`bg-transparent   font-bold shadow-none hover:bg-transparent ${infoActive ? 'text-red-500 ' : 'text-slate-400'}`}
            >
              2.Thanh Toán
            </Button>
            <div
              className={`line w-full h-[3px] ${infoActive ? 'bg-red-500' : ' bg-slate-400 '}`}
            ></div>
          </div>
        </div>

        <div className="show mt-4">
          {!infoActive ? (
            <div className="InfoUser ">
              <div className="mb-4 ">
                <div className="product flex justify-start gap-10 bg-white px-4 py-2 rounded-lg max-lg:text-sm">
                  <div className="img max-w-24 max-lg:max-w-14">
                    <Image
                      src={
                        'https://cdn2.cellphones.com.vn/100x100,webp,q100/media/catalog/product/s/s/ss-tab-s9-ultra_4.png'
                      }
                      quality={50}
                      width={500}
                      height={500}
                      alt=""
                    ></Image>
                  </div>
                  <div className="title">
                    <div className="nameproduct min-h-11 max-lg:text-sm">
                      Samsung Galaxy Tab S9 Ultra 12GB 512GB-Xám
                    </div>
                    <div className="price flex justify-between items-center">
                      <div className="price">26.890.000đ</div>
                      <div className="quanlity">Số lương : 1</div>
                    </div>
                  </div>
                </div>
              </div>

              <Title className="font-thin mb-2">Thông tin khách hàng</Title>
              <div className="infoCustomer mb-2 bg-white px-4 py-2 rounded-lg">
                <div className="">
                  <ProfileForm form={form} />
                </div>
              </div>
            </div>
          ) : (
            <div className="payment flex flex-col gap-4 text-sm">
              <div className="bg-white px-4 rounded-lg">
                <div className="flex justify-between items-center py-2  ">
                  <p className="text-slate-500">Số điện thoại</p>
                  <p className="">{infoReceive.PhoneNumber}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-slate-500">Email</p>
                  <p className="">{infoReceive.Email}</p>
                </div>
                <div className="flex justify-between items-start py-2">
                  <p className="text-slate-500 max-lg:min-w-28">
                    Nhận hàng tại
                  </p>
                  <p className="">{infoReceive.address}</p>
                </div>

                <div className="flex justify-between items-center py-2">
                  <p className="text-slate-500">Số Lượng Sản Phẩm</p>
                  <p className="">01</p>
                </div>

                <div className="flex justify-between items-center py-2">
                  <p className="text-slate-500">Tiền hàng (tạm tính)</p>
                  <p className="">26.890.000đ</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-slate-500">Phí vận chuyển</p>
                  <p className="">Miễn phí</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="">
                    Tổng tiền{' '}
                    <span className="text-slate-500"> (đã gồm VAT)</span>
                  </p>
                  <p className="">26.890.000đ</p>
                </div>
              </div>

              <div className="select-none">
                <Title>Thông tin thanh toán</Title>
                <div className="Info Payment bg-white px-4 py-4 rounded-lg flex flex-col gap-4">
                  <div
                    className={`flex gap-5 items-center  lg:min-h-[64px] hover:border-2 hover:border-slate-400 px-4  rounded-lg
                      cursor-pointer
                        ${pay === payType.VNPAY ? 'border-2  border-slate-400' : ''}`}
                    onClick={() => {
                      setPay(payType.VNPAY);
                    }}
                  >
                    <Image
                      src="/imgs/Payment-VNPay.jpg"
                      alt="VN-Pay"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: '5%', height: 'auto' }}
                    />{' '}
                    <span>VNPAY</span>
                  </div>
                  <div
                    className={`flex gap-5 items-center  lg:min-h-[64px] hover:border-2 hover:border-slate-400 px-4  rounded-lg 
                       cursor-pointer
                        ${pay === payType.COD ? 'border-2  border-slate-400' : ''}`}
                    onClick={() => {
                      setPay(payType.COD);
                    }}
                  >
                    <Image
                      src="/imgs/Payment-ThanhToanNhanHang.jpg"
                      alt="ThanhToanNhanHang"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: '5%', height: 'auto' }}
                    />

                    <span>Thanh Toán Sau Khi Nhận Hàng</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-white border border-[rgba(145,158,171,0.239)] rounded-t-md shadow-[0_-4px_20px_-1px_rgba(40,124,234,0.15)] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] p-[10px_10px_15px] z-11">
        <div className="temp-info flex flex-col w-full gap-3">
          <div className="price-temp">
            <div className="font-semibold w-full flex justify-between items-center text-xl">
              <div className="">Tổng tiền tạm tính:</div>
              <div className="text-red-600/100">26.890.000 đ</div>
            </div>
          </div>

          <Button
            className="bg-[#d1041d] w-full text-xl"
            onClick={handleActivePayment}
          >
            {infoActive ? 'Thanh Toán' : 'Tiếp tục'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
