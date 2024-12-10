'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ProfileForm } from '@/app/cart/payment/formInfo';
import Title from '@/components/title/Title';
import { Button } from '@/components/ui/button';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendRequest } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { ICart } from '@/components/cart/cart';
import { formatCurrency } from '@/utils/price';
import {
  listApi_Nest_Server_API_Route,
  listApi_Next_Server,
} from '@/utils/listApi';

// Định nghĩa schema của form
const formSchema = z.object({
  Email: z.string().min(2, { message: 'Email must be at least 2 characters.' }),
  PhoneNumber: z
    .string()
    .regex(/^0\d{9}$/, 'Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0'),
  address: z.string().nonempty('Vui lòng chọn địa chỉ nhận hàng'),
});

enum payType {
  COD = 'COD',
  VNPAY = 'VNPAY',
}

const Payment = () => {
  const router = useRouter();
  const [infoActive, setInfoActive] = useState(false);

  const { accessToken, email, phone, ...data } = useAppSelector(
    (state: any) => state.account
  );
  //console.log(`data:`, data);

  const [itemPayment, setItemPayment] = useState<ICart[]>([]);
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<{ slug: string; color: string }[]>(
    []
  );

  const [infoReceive, setInfoReceive] = useState({
    Email: '',
    PhoneNumber: '',
    address: '',
  });

  const [pay, setPay] = useState<payType>(payType.VNPAY);

  if (!accessToken) {
    router.push('/auth');
  }
  useEffect(() => {
    const slugParams = searchParams.getAll('slug');
    const colorParams = searchParams.getAll('color');

    const parsedItems = slugParams.map((slug, index) => ({
      slug,
      color: colorParams[index],
    }));
    setProducts(parsedItems);
  }, [searchParams]);

  useEffect(() => {
    const getCart = async () => {
      const cart = await sendRequest<IBackendRes<any[]>>({
        url: listApi_Next_Server.cart(),
        method: `GET`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (cart.data) {
        //console.log('Cart data:', cart.data);

        const newCart = cart.data
          .map((itemCart) => {
            // Tìm item tương ứng trong items dựa trên slug và color
            const matchedItem = products.find(
              (item) =>
                item.slug === itemCart?.slug?.slug &&
                item.color === itemCart?.color
            );

            if (matchedItem) {
              const optionIndex = itemCart?.slug?.option?.findIndex(
                (itemOption: any) => itemOption.color === matchedItem.color
              );

              // Kiểm tra optionIndex hợp lệ trước khi truy cập các giá trị bên trong
              const option =
                optionIndex !== -1 ? itemCart.slug.option[optionIndex] : {};

              //console.log(`itemCart:`, itemCart);
              return {
                color: itemCart?.color,
                slug: itemCart?.slug?.slug,
                name: itemCart?.slug?.name,
                price: option?.price || 0,
                img: option?.img || '',
                quantity: itemCart?.quantity,
              };
            }
            return null; // Nếu không tìm thấy item khớp
          })
          .filter(Boolean); // Lọc các phần tử null ra khỏi mảng

        setItemPayment(newCart as any);
      }
    };
    getCart();
  }, [accessToken, products]);

  // Sử dụng useForm tại đây
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: `${email}`,
      //PhoneNumber: phone ?? '0343128733',
      PhoneNumber: '0343128733',
      address: '',
    },
  });

  // Hàm handleSubmit để gọi từ button "Tiếp tục"
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setInfoActive(true); // Chuyển sang bước thanh toán
    setInfoReceive(values); // lưu thông tin nhận hàng vào state
  };

  const handleActivePayment = async () => {
    if (!infoActive) {
      form.handleSubmit(onSubmit)(); // Gọi submit form
      //console.log('ifno');
    } else {
      const product = itemPayment.map((item) => {
        return { slug: item.slug, color: item.color, quantity: item.quantity };
      });

      const payload = {
        item: [...product],
        email: infoReceive.Email,
        numberPhone: infoReceive.PhoneNumber,
        addressShiping: infoReceive.address,
      };

      if (pay === payType.VNPAY) {
        const crateOrder = await sendRequest<IBackendRes<any>>({
          method: 'POST',
          url: listApi_Nest_Server_API_Route.createPaymentVnPay(),
          body: payload,
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (crateOrder.statusCode === 201) {
          console.log('');
          console.log(' crateOrder.data.vnpUrl :  ', crateOrder.data.vnpUrl);
          console.log('');

          window.location.href = crateOrder.data.vnpUrl;
        } else {
          console.log('');
          console.log(
            ' crateOrder.data.vnpUrl Error:  ',
            crateOrder.data.vnpUrl
          );
          console.log('');
        }
      } else {
        const crateOrder = await sendRequest<IBackendRes<any>>({
          method: 'POST',
          url: listApi_Nest_Server_API_Route.createBillCOD(),
          body: payload,
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (crateOrder.statusCode === 201) {
          console.log('');
          console.log(' crateOrder.data.vnpUrl :  ', crateOrder);
          console.log('');
          router.push(`/bill/${crateOrder.data._id}`);
          //window.location.href = crateOrder.data.vnpUrl;
        } else {
          console.log('');
          console.log(
            ' crateOrder.data.vnpUrl Error:  ',
            crateOrder.data.vnpUrl
          );
          console.log('');
        }
      }
    }
  };

  const total =
    itemPayment.length > 0 &&
    itemPayment.reduce((total: any, item: any) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);

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
                {itemPayment.length > 0 &&
                  itemPayment.map((item: ICart, index: any) => {
                    return (
                      <div
                        key={index}
                        className="product flex justify-start gap-10 bg-white px-4 py-2 rounded-lg max-lg:text-sm min-h-[140px]  mt-5"
                      >
                        <div className="img max-w-24 max-lg:max-w-14">
                          <Image
                            src={item.img[0].link}
                            quality={50}
                            width={500}
                            height={500}
                            alt=""
                            className="max-w-[100px] max-h-[120px] rounded-xl"
                          ></Image>
                        </div>
                        <div className="title basis-4/6">
                          <div className="nameproduct min-h-11 max-lg:text-sm">
                            {item.name}
                          </div>
                          <div className="price flex justify-between items-center">
                            <div className="color">
                              Màu:{''} {item.color}
                            </div>
                            <div className="price">
                              {formatCurrency(item.price as any)} {''} đ
                            </div>
                            <div className="quanlity">
                              Số lương : {''}
                              {item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                  <p className="text-slate-500">Tiền hàng (tạm tính)</p>
                  <p className=""> {formatCurrency(total as any)}đ</p>
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
                  <p className=""> {formatCurrency(total as any)}đ</p>
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
              <div className="text-red-600/100">
                {formatCurrency(total as any)}đ
              </div>
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
