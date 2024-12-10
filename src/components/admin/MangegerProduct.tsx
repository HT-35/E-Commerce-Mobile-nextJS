'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { InputSearch } from '@/components/input/InputSearch';
import { Button } from '@/components/ui/button';
import ModalCreate from '@/components/admin/modal/ModalCreate';
import { FormCreateProduct } from '@/components/admin/form/CreateProduct';
import { sendRequest } from '@/utils/fetchApi';

import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { AcceptDeleteProduct } from '@/components/admin/form/DeleteProduct';
import { FormUpdateProduct } from '@/components/admin/form/FormUpdateProduct';
import ModalUpdate from '@/components/admin/modal/ModalUpdate';

import { listApi_Nest_Server_API_Route, listApi_Next_Server } from '@/utils/listApi';
import { formatCurrency } from '@/utils/price';

const ListBrand: any = [
  {
    brand: 'Tất Cả',
  },
  {
    brand: 'iPhone',
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

const MangegerProduct = () => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const [product, setProduct] = useState<any>([]);
  const [listProductSearch, setListProductSearch] = useState<any>([]);

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

  const [search, setSearch] = useState<string>('');

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

  useEffect(() => {
    if (search !== '') {
      const searchAccount = product.filter((item: any) => {
        const searchLower = search.toLowerCase(); // Chuyển giá trị tìm kiếm về chữ thường
        const nameWords = item?.name?.toLowerCase()?.split(' ') || []; // Tách tên thành các từ
        //const brandWords = item?.brand?.toLowerCase()?.split(' ') || []; // Tách thương hiệu thành các từ

        // Kiểm tra xem từ tìm kiếm có tồn tại trong danh sách từ của tên hoặc thương hiệu
        return nameWords.includes(searchLower) || item?.name?.toLowerCase()?.includes(search);

        //if (nameWords.includes(searchLower)) {
        //  return nameWords.includes(searchLower);
        //} else if (item?.name?.toLowerCase()?.includes(search)) {
        //  return item?.name?.toLowerCase()?.includes(search);
        //} else {
        //  [];
        //}
      });

      console.log(searchAccount);

      //setListProductSearch(searchAccount);
      setListProductSearch(searchAccount);
    } else {
      setListProductSearch([]);
    }
  }, [product, search]);

  // Handle brand filter
  const handleBrandFilter = async (brand: any) => {
    console.log(`brand:`, brand);
    setSelectedBrand(brand); // Update selected brand
    if (brand === 'Tất Cả') {
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Next_Server.getAllProduct(),
        method: 'GET',
      });
      setProduct(res?.data?.result);
    } else {
      const res = await sendRequest<IBackendRes<any>>({
        url: listApi_Nest_Server_API_Route.getProductByBrandToLowerCase(brand),
        method: 'GET',
      });
      console.log(`res:`, res);
      setProduct(res?.data);
    }
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

      <ModalUpdate activeFormUpdate={activeFormUpdate} setActiveFormUpdate={setActiveFormUpdate}>
        <FormUpdateProduct data={dataUpdateProdcut} setActiveFormUpdate={setActiveFormUpdate} />
      </ModalUpdate>

      <div className="menu flex justify-between items-center mb-4">
        <div className="search">
          <InputSearch
            placeholder="Nhập Tên Sản Phẩm..."
            className="placeholder:text-black"
            setSearch={setSearch}
          ></InputSearch>
        </div>

        {ListBrand.map((item: any, index: any) => {
          return (
            <div key={index}>
              <Button
                className={`  hover:bg-slate-100 border-[1px] border-slate-400  
                      ${selectedBrand === item.brand || (item.brand === 'Tất Cả' && selectedBrand === '') ? 'bg-slate-100 text-black' : 'bg-white text-black'}`}
                onClick={() => handleBrandFilter(item.brand)}
              >
                {item.brand}
              </Button>
            </div>
          );
        })}

        <Button className="" onClick={() => setActiveFormCreate(true)}>
          Thêm Sản Phẩm
        </Button>

        <ModalCreate activeForm={activeFormCreate} setActiveForm={setActiveFormCreate}>
          <FormCreateProduct />
        </ModalCreate>
      </div>

      <div className="line h-[1px] w-full bg-slate-600 my-2 "></div>
      <div className="overflow-hidden overflow-y-auto " style={{ height: `${screenHeight - 30}px` }}>
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
            {listProductSearch?.length > 0 &&
              listProductSearch?.map((item: any, index: number) => {
                //console.log(`item:`, item);
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{formatCurrency(item.option[0].price as any)} đ</TableCell>
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
            {listProductSearch?.length == 0 &&
              product?.length > 0 &&
              product?.map((item: any, index: number) => {
                //console.log(`item:`, item);
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell> {formatCurrency(item.option[0].price as any)} đ</TableCell>
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
