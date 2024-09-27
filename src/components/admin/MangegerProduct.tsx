'use client';
import React from 'react';
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

const listProduct: {
  img: string;
  name: string;
  price: string;
  brand: string;
  ram: string;
  rom: string;
}[] = [
  {
    img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png',
    name: 'Samsung Galaxy S24 Ultra 12GB 256GB',
    price: '29.990.000',
    brand: 'SamSung',
    ram: '16',
    rom: '128',
  },
  {
    img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png',
    name: 'Samsung Galaxy S24 Ultra 12GB 256GB',
    price: '29.990.000',
    brand: 'SamSung',
    ram: '16',
    rom: '128',
  },
  {
    img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png',
    name: 'Samsung Galaxy S24 Ultra 12GB 256GB',
    price: '29.990.000',
    brand: 'SamSung',
    ram: '16',
    rom: '128',
  },
];

const MangegerProduct = () => {
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
          {listProduct.map((item, index) => {
            return (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>

                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.ram}</TableCell>
                <TableCell>{item.rom}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MangegerProduct;
