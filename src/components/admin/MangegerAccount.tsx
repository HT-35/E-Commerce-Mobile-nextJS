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
import Image from 'next/image';

const listAccount: {
  name: string;
  email: string;
  role: string;
  phone: string;
}[] = [
  {
    name: 'Trần Quang Huy',
    role: 'admin',
    email: 'huytran.itvn@gmial.com',
    phone: '0343128733',
  },
];

const MangegerAccount = () => {
  return (
    <div className="">
      <div className="menu flex justify-between items-center mb-4">
        <div className="search">
          <InputSearch
            placeholder="Nhập email..."
            className="placeholder:text-black"
          ></InputSearch>
        </div>

        <Button className="brand">Lọc Người Dùng</Button>

        <ModalCreate title="Tạo Tài Khoản Nhân Viên">
          <FormCreateUser></FormCreateUser>
        </ModalCreate>
      </div>

      <div className="line h-[1px] w-full bg-slate-600 my-2"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên Người Dùng</TableHead>

            <TableHead>Quyền</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số Điện Thoại</TableHead>
            <TableHead>Hình Ảnh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listAccount.map((item, index) => {
            return (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>

                <TableCell>{item.role}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <Image
                    src={
                      'https://avatars.githubusercontent.com/u/88173515?s=400&u=7d08d05134d70ba96aaf7b8da859322edd4853ee&v=4'
                    }
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{
                      width: '70px',
                      height: 'auto',
                      borderRadius: '100px',
                    }}
                    alt="Picture of the author"
                  ></Image>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MangegerAccount;
