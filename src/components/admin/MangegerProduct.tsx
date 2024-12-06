'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { InputSearch } from '@/components/input/InputSearch';
import { Button } from '@/components/ui/button';
import ModalCreate from '@/components/admin/modal/ModalCreate';
import { FormCreateProduct } from '@/components/admin/form/CreateProduct';
import FormCreateUser from '@/components/admin/form/CreateUser';
import { sendRequest } from '@/utils/fetchApi';

import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import { AcceptDeleteProduct } from '@/components/admin/form/DeleteProduct';
import { FormUpdateProduct } from '@/components/admin/form/FormUpdateProduct';
import ModalUpdate from '@/components/admin/modal/ModalUpdate';
import { Scrollbar } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  listApi_Nest_Server_API_Route,
  listApi_Next_Server,
} from '@/utils/listApi';

const ListBrand: any = [
  {
    brand: 'Tất Cả',
  },
  {
    brand: 'iPhone',
  },
  {
    brand: 'Samsung',
  },
  {
    brand: 'Xiaomi',
  },
  {
    brand: 'Oppo',
  },
];

const MangegerProduct = () => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const [product, setProduct] = useState<any>([]);

  const [acceptDelete, setAcceptDelete] = useState<boolean>(false);
  const [dataDeleteProdcut, setDataDeleteProduct] = useState<{
    slug: string;
    name: string;
  }>({ slug: '', name: '' });

  const [activeFormCreate, setActiveFormCreate] = useState<boolean>(false);

  const [activeFormUpdate, setActiveFormUpdate] = useState<boolean>(false);
  const [dataUpdateProdcut, setDataUpdateProduct] = useState<{
    slug: string;
    name: string;
  }>({ slug: '', name: '' });

  const router = useRouter();
  const { accessToken } = useAppSelector((item) => item.account);

  if (!accessToken) {
    router.push('/auth?callback=/admin');
  }

  const [screenHeight, setScreenHeight] = useState<number>(0);
  useEffect(() => {
    setScreenHeight(Number(window.innerHeight - 160));
  }, [screenHeight]);
  useEffect(() => {
    const getProduct = async () => {
      const product = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Next_Server.getAllProduct(),
      });

      setProduct(product.data.result);
    };
    getProduct();
  }, []);

  // Handle brand filter
  const handleBrandFilter = async (brand: any) => {
    setSelectedBrand(brand); // Update selected brand
    const res = await sendRequest<IBackendRes<any>>({
      url: listApi_Nest_Server_API_Route.getProductByBrandToLowerCase(brand),
      method: 'GET',
    });

    setProduct(res?.data);
  };

  return (
    <div className="relative">
      <AcceptDeleteProduct
        setProduct={setProduct}
        accessToken={accessToken!}
        acceptDelete={acceptDelete}
        setAcceptDelete={setAcceptDelete}
        dataDeleteProdcut={dataDeleteProdcut}
      ></AcceptDeleteProduct>

      <ModalUpdate
        activeFormUpdate={activeFormUpdate}
        setActiveFormUpdate={setActiveFormUpdate}
      >
        <FormUpdateProduct
          data={dataUpdateProdcut}
          setActiveFormUpdate={setActiveFormUpdate}
        />
      </ModalUpdate>

      <div className="menu flex justify-between items-center mb-4">
        <div className="search">
          <InputSearch
            placeholder="Nhập Tên Sản Phẩm..."
            className="placeholder:text-black"
          ></InputSearch>
        </div>

        <div className=" w-[800px]">
          <Swiper
            slidesPerView={4}
            spaceBetween={5}
            breakpoints={{
              1024: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              0: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
            }}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            className="mySwiper bg-transparent"
          >
            {ListBrand.map((item: any, index: any) => {
              return (
                <SwiperSlide key={index}>
                  <Button
                    className={`  hover:bg-slate-100 border-[1px] border-slate-400  
                      ${selectedBrand === item.brand || (item.brand === 'Tất Cả' && selectedBrand === '') ? 'bg-slate-100 text-black' : 'bg-white text-black'}`}
                    onClick={() => handleBrandFilter(item.brand)}
                  >
                    {item.brand}
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <Button className="" onClick={() => setActiveFormCreate(true)}>
          Thêm Sản Phẩm
        </Button>

        <ModalCreate
          activeForm={activeFormCreate}
          setActiveForm={setActiveFormCreate}
        >
          <FormCreateProduct />
        </ModalCreate>
      </div>

      <div className="line h-[1px] w-full bg-slate-600 my-2 "></div>
      <div
        className="overflow-hidden overflow-y-auto "
        style={{ height: `${screenHeight - 30}px` }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên Sản Phẩm</TableHead>
              <TableHead>Hãng</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Ram</TableHead>
              <TableHead>Rom</TableHead>
              <TableHead className="w-32 text-center ">Chức Năng</TableHead>
              <TableHead className="w-32 text-center ">Chức Năng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {product.map((item: any, index: number) => {
              //console.log(`item:`, item);
              return (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.option[0].price}</TableCell>
                  <TableCell>{item.ram}</TableCell>
                  <TableCell>{item.rom}</TableCell>
                  <TableCell className="w-32 cursor-pointer">
                    <div
                      className="w-32 bg-yellow-400 text-center rounded-md py-2 hover:bg-red-600"
                      onClick={() => {
                        setDataUpdateProduct(item);
                        setActiveFormUpdate(true);
                      }}
                    >
                      Sửa
                    </div>
                  </TableCell>

                  <TableCell className="w-32 cursor-pointer  ">
                    <div
                      className="w-32 bg-red-400 text-center rounded-md py-2 hover:bg-red-600"
                      onClick={() => {
                        setDataDeleteProduct({
                          name: item.name,
                          slug: item.slug,
                        });
                        setAcceptDelete(true);
                      }}
                    >
                      Xóa
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MangegerProduct;
