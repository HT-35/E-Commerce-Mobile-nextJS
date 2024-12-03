'use client';
import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSearchParams } from 'next/navigation';
import { sendRequest } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { listApi } from '@/utils/listApi';

const parseOrderInfo = (orderInfo: string) => {
  return orderInfo
    .split(/-slug:/) // Tách mỗi sản phẩm dựa trên `-slug:`
    .filter(Boolean) // Loại bỏ các phần tử rỗng
    .map((product) => {
      const result: {
        map(arg0: (item: any) => any): unknown;
        slug?: string;
        color?: string;
        quantity?: number;
      } = {};

      // Thêm `slug:` vào đầu chuỗi để đảm bảo định dạng nhất quán
      const fields = `slug:${product}`.split('+');

      fields.forEach((field) => {
        const [key, ...valueParts] = field.split(':');
        const value = valueParts.join(':').trim();

        if (key && value) {
          if (key.trim() === 'slug') {
            result.slug = value;
          } else if (key.trim() === 'color') {
            result.color = value;
          } else if (key.trim() === 'quantity') {
            result.quantity = parseInt(value, 10);
          }
        }
      });

      return result; // Trả về object sản phẩm
    });
};

const Bill = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('vnp_OrderInfo');
  // Decode giá trị để đọc được thông tin
  const decodedOrderInfo = decodeURIComponent(search!);
  console.log(`decodedOrderInfo:`, decodedOrderInfo);
  const arrProduct = parseOrderInfo(decodedOrderInfo);

  let orderDetails = arrProduct?.map((item: any) => {
    // Kiểm tra nếu slug bắt đầu với 'slug:'
    if (item.slug.startsWith('slug:')) {
      // Loại bỏ phần 'slug:' khỏi slug
      item.slug = item.slug.replace('slug:', '').trim();
    }
    return item;
  });

  const { accessToken } = useAppSelector((item) => item.account);

  console.log(orderDetails);

  useEffect(() => {
    const createBill = async () => {
      const payload = {
        item: orderDetails,
        email: 'huyfa352002@gmail.com',
        numberPhone: '0343128733',
        addressShiping:
          'ngã 3 clb xanh, tổ 38 khu phố vườn dừa, phước tân, biên hòa đồng nai',
      };

      const bill = await sendRequest<IBackendRes<any>>({
        method: 'POST',
        url: listApi.createBill(),
        body: payload,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('');
      console.log('');
      console.log('bill  :   ', bill);
      console.log('');
      console.log('');
      console.log('');
    };
    createBill();
  }, [accessToken, orderDetails]);

  return (
    <div className="max-w-[800px] mx-auto bg-white px-10 pt-4 pb-14 mb-10">
      <div className="title text-center text-green-600 text-2xl font-semibold">
        Đặt Hàng Thành Công
      </div>
      <div className="title text-center">
        Cảm ơn bạn đã mua hàng tại HTS Store.
      </div>
      <div className="bg-slate-200 px-5 py-2">
        <div className=""> Đơn Hàng #22211232</div>
        <div className="receiver  flex gap-4">
          <span className="font-semibold  min-w-36"> - Người nhận hàng :</span>{' '}
          Trần Quang Huy
        </div>
        <div className="addressShiping flex gap-4">
          <span className="font-semibold  min-w-36">- Địa chỉ nhận hàng :</span>{' '}
          Ngã 3 clb xanh, tổ 38 khu phố vườn dừa, phước tân, biên hòa đồng nai
        </div>
        <div className=" flex gap-4">
          <span className="font-semibold  min-w-36"> - Tổng Tiền: </span>
          <span className="text-red-600 font-semibold"> 8.699.000 đ</span>
        </div>
      </div>
      <div className="my-2">Thông Tin về Sản Phẩm</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Sản Phẩm</TableHead>

            <TableHead className="text-center">Số Lượng</TableHead>
            <TableHead className="text-center">Giá Tiền</TableHead>
            <TableHead className="text-center">Tổng Tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">
              Samsung Galaxy A06 4GB 128GB
            </TableCell>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center">3.490.000 đ</TableCell>
            <TableCell className="text-center">6.490.000 đ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">
              Samsung Galaxy A06 4GB 128GB
            </TableCell>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center">3.490.000 đ</TableCell>
            <TableCell className="text-center">6.490.000 đ</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>

            <TableHead></TableHead>
            <TableHead className="text-red-600 font-semibold">
              Tổng Số Tiền
            </TableHead>
            <TableHead className="text-red-600 font-semibold">
              109.213.321 đ
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Bill;
