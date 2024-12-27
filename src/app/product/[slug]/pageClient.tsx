'use client';
import GalaryImg from '@/app/product/[slug]/Galary/Gallery';
import Title from '@/components/title/Title';
import { Button } from '@/components/ui/button';

//======
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { TriangleRightIcon } from '@radix-ui/react-icons';

import { Bounce, toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/fetchApi';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Option, typeProduct } from '@/types/typeProduct.type';
import { useRouter } from 'next/navigation';
import LoadingSkeleton from '@/components/loading/LoadingSkeleton';
import { formatCurrency } from '@/utils/price';
import { listApi_Next_Server } from '@/utils/listApi';

export interface IimgArr {
  link: string;
  cloudinary_id: string;
}

const ProductDetail = ({ slug }: { slug: string }) => {
  //console.log(`slug:`, slug);

  const router = useRouter();

  const data = useAppSelector((item) => item.account);
  //console.log(`data:`, data?.accessToken);

  const [color, setColor] = useState<string | undefined>('');
  const [price, setPrice] = useState<string>('');
  const [imgArr, setImgArr] = useState<IimgArr[]>([]);
  const [productList, setProductList] = useState<typeProduct>(); // Store single product info

  const [loadding, SetLoading] = useState<boolean>(true);

  useEffect(() => {
    SetLoading(true);
    const res = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Next_Server.getDetailProductbySlug(slug),
        method: 'GET',
      });

      if (res.data) {
        setProductList(res.data);
        setImgArr(res?.data?.option[0]?.img!);
        setColor(res?.data?.option[0]?.color);
        setPrice(formatCurrency(res?.data?.option[0]?.price));
      }
    };
    res();
    SetLoading(false);
  }, [slug]);
  //console.log(productList);

  useEffect(() => {
    SetLoading(true);

    productList?.option?.forEach((item, index) => {
      //console.log(item.color);

      if (item.color === color) {
        setImgArr(item?.img!);
        setPrice(formatCurrency(item?.price!));
      }
    });
    SetLoading(false);
  }, [color, productList?.option]);

  const success = () => {
    toast.success('Thêm vào giỏ hàng thành công', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  const handleAddToCart = async () => {
    if (data.accessToken === '') {
      router.push(`/auth?callback=/product/${slug}`);
    } else {
      const addProduct = await sendRequest<IBackendRes<any>>({
        method: 'POST',

        url: listApi_Next_Server.cart(),
        body: {
          slug,
          quantity: 1,
          color: color,
        },
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
      console.log(addProduct);

      if ((await addProduct.statusCode) === 201) {
        success();
      }
    }
  };
  const handleBuyNow = async () => {
    if (data.accessToken === '') {
      router.push(`/auth?callback=/product/${slug}`);
    } else {
      const addProduct = await sendRequest<IBackendRes<any>>({
        method: 'POST',

        url: listApi_Next_Server.cart(),
        body: {
          slug,
          quantity: 1,
          color: color,
        },
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
      console.log(addProduct);

      router.push('/cart');
    }
  };

  return (
    <>
      <div className="flex gap-4 lg:mt-2 max-xl:flex-col max-xl:text-black max-xl:text-xs">
        <div className="xl:w-[730px]  max-xl:h-[400px]  mb-2">
          {loadding ? (
            <>
              <LoadingSkeleton className=" xl:max-w-[830px] xl:h-[490px] max-xl:h-[320px]  mb-5 "></LoadingSkeleton>
              <div className=" flex  gap-4 xl:max-w-[830px] xl:h-[50px] max-xl:h-[40px] ">
                {Array(6)
                  .fill(null)
                  ?.map((_, index) => {
                    return <LoadingSkeleton key={index} className=" w-[150px] h-[60px]"></LoadingSkeleton>;
                  })}
              </div>
            </>
          ) : (
            <GalaryImg imgArr={imgArr}></GalaryImg>
          )}
        </div>

        <div className="xl:min-w-[400px] 2xl:min-w-[600px] text-black">
          {/*{loadding ? (
            <>
              <LoadingSkeleton className="px-[10px] xl:w-[500px]   h-[30px] mb-2"></LoadingSkeleton>
            </>
          ) : (
            <Title className="text-black font-semibold py-0 max-xl:text-black ">{productList?.name!}</Title>
          )}*/}

          {loadding ? (
            <div className="flex gap-2 my-2 px-[10px]">
              {/*<LoadingSkeleton className="px-[10px] xl:w-[500px]  h-[30px] mb-2"></LoadingSkeleton>*/}
              {Array(3)
                .fill(null)
                ?.map((_, index) => {
                  return <LoadingSkeleton key={index} className="w-[120px] h-[40px]"></LoadingSkeleton>;
                })}
            </div>
          ) : (
            <div className="color flex gap-4 px-[10px] py-2 text-black  max-xl:flex-wrap h-auto">
              {productList?.option?.length! > 0 &&
                productList?.option?.map((item: Option, index) => {
                  return (
                    <Button
                      key={index}
                      className={`py-1 px-4 bg-[#F3F4F6] text-black border-[1px] 
                      hover:bg-white hover:text-black  max-xl:text-black
                      ${color === item.color ? 'bg-white' : ' bg-[#F3F4F6]'}
                      `}
                      onClick={() => {
                        setColor(item.color);
                      }}
                    >
                      {item.color}
                    </Button>
                  );
                })}
            </div>
          )}

          {loadding ? (
            <div className=" my-3 px-[10px] flex gap-2 items-center">
              <div className="">Giá Tiền:</div>
              <LoadingSkeleton className="px-[10px] xl:w-[100px]  h-[30px] mb-2"></LoadingSkeleton>
            </div>
          ) : (
            <div className="my-4 px-[10px] text-red">
              Giá Tiền: <span className="text-[#d70018] font-bold">{price}đ</span>
            </div>
          )}
          <div className="Specificaitons lg:my-4 ml-[10px] bg-[#F3F4F6] text-black border-2 border-slate-400 rounded-lg">
            <Table>
              <TableBody>
                {/* Màn hình */}
                <TableRow>
                  <TableCell className="font-medium rounded-lg">Màn hình:</TableCell>
                  <TableCell className="text-left rounded-lg">{productList?.screen}</TableCell>
                </TableRow>
                {/* Chip */}
                <TableRow className="bg-white">
                  <TableCell className="font-medium">Chip:</TableCell>
                  <TableCell className="text-left">{productList?.chip}</TableCell>
                </TableRow>
                {/* RAM */}
                <TableRow>
                  <TableCell className="font-medium">RAM:</TableCell>
                  <TableCell className="text-left">{productList?.ram}</TableCell>
                </TableRow>
                {/* Dung lượng lưu trữ */}
                <TableRow className="bg-white">
                  <TableCell className="font-medium">Dung lượng lưu trữ:</TableCell>
                  <TableCell className="text-left">{productList?.rom}</TableCell>
                </TableRow>
                {/* SIM */}
                <TableRow>
                  <TableCell className="font-medium">SIM:</TableCell>
                  <TableCell className="text-left">{productList?.sim}</TableCell>
                </TableRow>
                {/* Pin */}
                <TableRow className="bg-white ">
                  <TableCell className="font-medium rounded-lg ">Pin:</TableCell>
                  <TableCell className="text-left rounded-lg ">{productList?.battery}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className=" flex gap-2 items-center  mx-2 my-2 text-white">
            <div
              className="text-center bg-blue-600 px-4 py-2 rounded-lg w-full cursor-pointer"
              onClick={handleAddToCart}
            >
              Thêm Vào Giỏ
            </div>
            <div
              className="bg-[#FB6E2E]  px-4 py-2 rounded-lg w-full cursor-pointer text-center"
              onClick={handleBuyNow}
            >
              Mua Ngay
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
