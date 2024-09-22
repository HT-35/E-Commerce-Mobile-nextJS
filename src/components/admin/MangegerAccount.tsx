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

const listAccount: {
  name: string;
  email: string;
  role: string;
  phone: string;
}[] = [
  {
    name: 'Trần Quang Huy',
    email: 'huytran.itvn@gmial.com',
    role: 'admin',
    phone: 'phone',
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

            <TableHead>Email</TableHead>
            <TableHead>Quyền</TableHead>
            <TableHead>Số Điện Thoại</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listAccount.map((item, index) => {
            return (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>

                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.phone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MangegerAccount;
