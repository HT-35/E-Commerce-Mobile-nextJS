'use client';
import React, {useState, useEffect} from 'react';
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
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

// const listProduct: {
//   img: string;
//   name: string;
//   price: string;
//   brand: string;
//   ram: string;
//   rom: string;
// }[] = [
//   {
//     img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png',
//     name: 'Samsung Galaxy S24 Ultra 12GB 256GB',
//     price: '29.990.000',
//     brand: 'SamSung',
//     ram: '16',
//     rom: '128',
//   },
//   {
//     img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png',
//     name: 'Samsung Galaxy S24 Ultra 12GB 256GB',
//     price: '29.990.000',
//     brand: 'SamSung',
//     ram: '16',
//     rom: '128',
//   },
//   {
//     img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png',
//     name: 'Samsung Galaxy S24 Ultra 12GB 256GB',
//     price: '29.990.000',
//     brand: 'SamSung',
//     ram: '16',
//     rom: '128',
//   },
// ];

const MangegerProduct = () => {

      const { name, _id, accessToken, email } = useAppSelector((item) => item.account);

      const [productList, setProductList] = useState([]);

      useEffect(() => {
        const res = async () => {
          const res = await sendRequest<IBackendRes<any>>({
            url: 'localhost:3000/api/product/',
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setProductList(res.data.result);
        };
        res();
      }, [accessToken]);

      console.log(productList);

        const handleDeleteProduct = async (slug: string) => {
    const confirmed = confirm('Bạn có chắc muốn xoá sản phẩm này?');
    if (confirmed) {
      try {
        await sendRequest({
          url: `localhost:3000/api/product?slug=${slug}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Update the UI by filtering out the deleted user
        setProductList((prevList) => prevList.filter((product) => product.slug !== slug));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="">
      <div className="menu flex justify-between items-center mb-4">
        <div className="search">
          <InputSearch
            placeholder="Nhập Tên Sản Phẩm..."
            className="placeholder:text-black"
          ></InputSearch>
        </div>

        <Button className="brand">Lọc Sản Phẩm</Button>

        <ModalCreate title="Thêm Sản Phẩm">
          <FormCreateProduct />
        </ModalCreate>
      </div>

      <div className="line h-[1px] w-full bg-slate-600 my-2"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên Sản Phẩm</TableHead>

            <TableHead>Hãng</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Ram</TableHead>
            <TableHead>Rom</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((item, index) => {
            return (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>

                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.option[0].price}</TableCell>
                <TableCell>{item.ram}</TableCell>
                <TableCell>{item.rom}</TableCell>
                                <TableCell>
                  <Pencil1Icon/>
                </TableCell>
                <TableCell>
                <TrashIcon onClick={() => handleDeleteProduct(item.slug)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MangegerProduct;
