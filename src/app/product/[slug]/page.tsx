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
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/slices/accountSlice';

const page = ({ params }: { params: { slug: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug } = params;
  const dispatch = useAppDispatch();

  const imgArr = [
    {
      index: 1,
      url: 'https://cdn.tgdd.vn/Products/Images/42/200533/Slider/iphone-11-pro-max-160820-1111380-800x444.jpg',
    },
    {
      index: 2,
      url: 'https://cdn.tgdd.vn/Products/Images/42/200533/Slider/vi-vn-iphone-11-pro-max-tinhnang.jpg',
    },
    {
      index: 3,
      url: 'https://cdn.tgdd.vn/Products/Images/42/200533/Slider/-iphone-11-pro-max-thietke.jpg',
    },
    {
      index: 4,
      url: 'https://cdn.tgdd.vn/Products/Images/42/200533/Slider/vi-vn-iphone-11-pro-max-tongquan.jpg',
    },
    {
      index: 5,
      url: 'https://cdn.tgdd.vn/Products/Images/42/200533/Slider/vi-vn-iphone-11-pro-max-mausac.jpg',
    },
    {
      index: 6,
      url: 'https://cdn.tgdd.vn/Products/Images/42/200533/Slider/vi-vn-iphone-11-pro-max-chupanh.jpg',
    },
  ];

  const specification = [
    {
      accessory: 'Màn hình:',
      specification: 'OLED6.5"Super Retina XDR',
    },
    {
      accessory: 'Chip:',
      specification: 'Apple A13 Bionic',
    },
    {
      accessory: 'RAM:',
      specification: '4 GB',
    },
    {
      accessory: 'Dung lượng lưu trữ:',
      specification: '64 GB',
    },
    {
      accessory: 'SIM:',
      specification: '1 Nano SIM & 1 eSIMHỗ trợ 4G',
    },
    {
      accessory: 'Pin, Sạc:',
      specification: '3969 mAh18 W',
    },
  ];

  const [productList, setProductList] = useState<any>({}); // Store single product info

  useEffect(() => {
    const res = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: `localhost:3000/api/product/${slug}`,
        method: 'GET',
      });
      setProductList(res.data);
    };
    res();
  }, [slug]);

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

  const handleAddToCart = () => {
    const productToAdd = {
      _id: productList._id,
      slug: productList.slug,
      price: productList.price,
      quatity: 1, // Default quantity is 1
    };
    dispatch(addToCart(productToAdd)); // Dispatch action to add to cart
    success();
  };

  return (
    <div className="flex gap-4 lg:mt-2 max-xl:flex-col max-xl:text-black max-xl:text-xs">
      <div className="">
        {/*<Slider Banner={Banner}></Slider>*/}
        <GalaryImg imgArr={imgArr}></GalaryImg>
      </div>
      <div className="basis-3/6 text-black">
        <Title className="text-black font-semibold py-0 max-xl:text-black">
          {productList.name}
        </Title>
        <div className="color flex gap-4 px-[10px] py-2 text-black ">
          <Button className="py-1 px-4 bg-[#F3F4F6] text-black border-[1px]   hover:bg-[#F3F4F6] hover:text-black  max-xl:text-black ">
            Bạc
          </Button>
          <Button className="py-1 px-4 border-[1px] bg-transparent text-black hover:bg-[#F3F4F6] hover:text-black   max-xl:text-black ">
            Xanh Lá
          </Button>
          <Button className="py-1 px-4 border-[1px] bg-transparent hover:bg-[#F3F4F6] hover:text-black   max-xl:text-black ">
            Vàng Đồng
          </Button>
        </div>

        <div className="Specificaitons lg:my-4 ml-[10px] bg-[#F3F4F6] text-black">
          {/* <Table>
            <TableBody>
              {specification.map((item, index) => {
                const backgroundWhite = index % 2 ? 'bg-white' : '';

                console.log(backgroundWhite);

                return (
                  <TableRow key={index} className={`${backgroundWhite}`}>
                    <TableCell className="font-medium">
                      {item.accessory}
                    </TableCell>
                    <TableCell className="text-left">
                      {item.specification}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table> */}
          <Table>
            <TableBody>
              {/* Màn hình */}
              <TableRow>
                <TableCell className="font-medium">Màn hình:</TableCell>
                <TableCell className="text-left">{productList.screen}</TableCell>
              </TableRow>
              {/* Chip */}
              <TableRow className="bg-white">
                <TableCell className="font-medium">Chip:</TableCell>
                <TableCell className="text-left">Apple A13 Bionic</TableCell>
              </TableRow>
              {/* RAM */}
              <TableRow>
                <TableCell className="font-medium">RAM:</TableCell>
                <TableCell className="text-left">{productList.ram}</TableCell>
              </TableRow>
              {/* Dung lượng lưu trữ */}
              <TableRow className="bg-white">
                <TableCell className="font-medium">Dung lượng lưu trữ:</TableCell>
                <TableCell className="text-left">{productList.rom}</TableCell>
              </TableRow>
              {/* SIM */}
              <TableRow>
                <TableCell className="font-medium">SIM:</TableCell>
                <TableCell className="text-left">1 Nano SIM & 1 eSIMHỗ trợ 4G'</TableCell>
              </TableRow>
              {/* Pin, Sạc */}
              <TableRow className="bg-white">
                <TableCell className="font-medium">Pin, Sạc:</TableCell>
                <TableCell className="text-left">{productList.battery}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button className="ml-[10px] bg-white text-black border-[1px] border-blue-600  hover:bg-[#F3F4F6] hover:text-blue-600">
          Xem Thêm Cấu Hình Chi Tiết <TriangleRightIcon />
        </Button>

        <div className=" flex gap-2 items-center  mx-2 my-2 text-white">
          <div
            className=" bg-blue-600 px-4 py-2 rounded-lg w-full cursor-pointer"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </div>
          <div className="bg-[#FB6E2E]  px-4 py-2 rounded-lg w-full cursor-pointer">
            Thanh Toán
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
