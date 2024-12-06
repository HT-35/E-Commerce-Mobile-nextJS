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
import Image from 'next/image';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Next_Server } from '@/utils/listApi';
import { DeleteUser } from '@/components/admin/form/DeleteUser';
import UpdateUser from '@/components/admin/form/UpdateUser';
import ModalUpdate from '@/components/admin/modal/ModalUpdate';

enum Role {
  all = 'all',
  user = 'user',
  admin = 'admin',
}

const ListOrder: {
  _id: string;
  orderDay: string;
  userName: string;
  product: string;
  total: string;
  paymentMethod: string;
  payment: string;
  orderStatus: string;
}[] = [
  {
    _id: '#1232132131',
    orderDay: '1/12/2024',
    userName: 'Huy Trần - 0343128733 - biên hòa, đồng nai',
    product: 'iphone 12',
    total: '12.000.000',
    paymentMethod: 'VNPAY',
    payment: 'Đã Thanh Toán',
    orderStatus: 'Đang Giao Hàng',
  },
  {
    _id: '#1232132131',
    orderDay: '11/12/2024',
    userName: 'Huy Trần - 0343128733 - biên hòa, đồng nai',
    product: 'iphone 12',
    total: '12.000.000',
    paymentMethod: 'VNPAY',
    payment: 'Đã Thanh Toán',
    orderStatus: 'Đang Giao Hàng',
  },
  {
    _id: '#1232132131',
    orderDay: '19/12/2024',
    userName: 'Huy Trần - 0343128733 - biên hòa, đồng nai',
    product: 'iphone 12',
    total: '12.000.000',
    paymentMethod: 'VNPAY',
    payment: 'Đã Thanh Toán',
    orderStatus: 'Đang Giao Hàng',
  },
];

const MangegerOrder = () => {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const { accessToken } = useAppSelector((item) => item.account);

  const [screenHeight, setScreenHeight] = useState<number>(0);
  useEffect(() => {
    setScreenHeight(Number(window.innerHeight - 160));
  }, [screenHeight]);

  const [listUser, setListUser] = useState<
    {
      _id: string;
      name: string;
      role: string;
      email: string;
      numberPhone: string;
    }[]
  >([]);

  const [allUser, setAllUser] = useState<
    {
      _id: string;
      name: string;
      role: string;
      email: string;
      numberPhone: string;
    }[]
  >([]);

  const [dataUpdateUser, setDataUpdateUser] = useState<{
    _id: string;
    name: string;
    role: string;
    email: string;
    numberPhone: string;
  }>({ _id: '', name: '', role: '', email: '', numberPhone: '' });

  const [activeFormUpdateUser, setActiveFormUpdateUser] = useState(false);

  const [activeDelete, setActiveDelete] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState<{
    _id: string;
    name: string;
  }>({ _id: '', name: '' });

  const [roleAccount, setRoleAccount] = useState<Role>(Role.all);

  const [search, setSearch] = useState<string>('');
  const [listUserSearch, setListUserSearch] = useState<
    {
      _id: string;
      name: string;
      role: string;
      email: string;
      numberPhone: string;
    }[]
  >([]);

  useEffect(() => {
    const getUser = async () => {
      const user = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Next_Server.getAllAccount(),

        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const listUser: {
        _id: string;
        name: string;
        role: string;
        email: string;
        numberPhone: string;
      }[] = await user?.data?.result?.map((item: any) => {
        return {
          _id: item._id,
          email: item.email,
          role: item.role,
          numberPhone: item.numberPhone,
          name: item.name,
        };
      });
      setAllUser(listUser);
      //setListUser(listUser);
    };
    getUser();
  }, [accessToken, activeFormUpdateUser]);

  if (!accessToken) {
    router.push(`/auth?callback=/admin`);
  }

  useEffect(() => {
    if (roleAccount === Role.admin) {
      const accAdmin = allUser.filter((item) => item.role === Role.admin);
      setListUser(accAdmin);
    } else if (roleAccount === Role.user) {
      const accUser = allUser.filter((item) => item.role === Role.user);
      setListUser(accUser);
    } else {
      setListUser(allUser);
    }
  }, [allUser, roleAccount, search]);
  useEffect(() => {
    if (search !== '') {
      const searchAccount = listUser.filter(
        (item) => item.email.includes(search) || item.name.includes(search)
      );
      console.log(`searchAccount:`, searchAccount);
      setListUserSearch(searchAccount);
    } else if (search === '') {
      setListUserSearch([]);
    }
  }, [listUser, search]);

  return (
    <div className="">
      <ModalUpdate
        activeFormUpdate={activeFormUpdateUser}
        setActiveFormUpdate={setActiveFormUpdateUser}
      >
        <UpdateUser
          data={dataUpdateUser}
          setActiveFormUpdate={setActiveFormUpdateUser}
        />
      </ModalUpdate>

      <DeleteUser
        activeDelete={activeDelete}
        setActiveDelete={setActiveDelete!}
        dataDeleteUser={dataDeleteUser}
        setUser={setListUser}
        accessToken={accessToken!}
      ></DeleteUser>

      <div className="menu flex justify-between items-center mb-4">
        <div className="search">
          <InputSearch
            placeholder="Nhập email..."
            className="placeholder:text-black"
            setSearch={setSearch}
          ></InputSearch>
        </div>

        <Button
          className={` ${roleAccount === Role.all ? 'bg-gray-300' : 'bg-gray-100'}  text-black hover:bg-gray-300`}
          onClick={() => setRoleAccount(Role.all)}
        >
          Tất Cả Tài Khoản
        </Button>

        <Button
          className={` ${roleAccount === Role.admin ? 'bg-gray-300' : 'bg-gray-100'}  text-black hover:bg-gray-300`}
          onClick={() => setRoleAccount(Role.admin)}
        >
          Tài Khoản Nhân Viên
        </Button>

        <Button
          className={` ${roleAccount === Role.user ? 'bg-gray-300' : 'bg-gray-100'}  text-black hover:bg-gray-300`}
          onClick={() => setRoleAccount(Role.user)}
        >
          Tài Khoản Khách Hàng
        </Button>

        <ModalCreate activeForm={activeForm} setActiveForm={setActiveForm}>
          <FormCreateUser setActiveForm={setActiveForm}></FormCreateUser>
        </ModalCreate>

        <Button
          className="brand"
          onClick={() => {
            setActiveForm(true);
          }}
        >
          Tạo Tài Khoản Nhân Viên
        </Button>
      </div>
      <div className="line h-[1px] w-full bg-slate-600 my-2"></div>

      <div
        className="overflow-hidden overflow-y-auto "
        style={{ height: `${screenHeight - 30}px` }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Đơn Hàng</TableHead>

              <TableHead>Ngày Đặt</TableHead>
              <TableHead>Khách Hàng</TableHead>
              <TableHead>Sản Phẩm</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Thanh Toán</TableHead>
              <TableHead>Trạng Thái Thanh Toán</TableHead>
              <TableHead>Trạng Thái Đơn Hàng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listUserSearch.length > 0 &&
              listUserSearch.map((item, index) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.numberPhone}</TableCell>
                    <TableCell className="w-32 cursor-pointer">
                      <div
                        className="w-32 bg-yellow-400 text-center rounded-md py-2 hover:bg-red-600"
                        onClick={() => {
                          setDataUpdateUser(item);
                          setActiveFormUpdateUser(true);
                        }}
                      >
                        Sửa
                      </div>
                    </TableCell>

                    <TableCell className="w-32 cursor-pointer  ">
                      <div
                        className="w-32 bg-red-400 text-center rounded-md py-2 hover:bg-red-600"
                        onClick={() => {
                          setDataDeleteUser({
                            name: item.name,
                            _id: item._id,
                          });
                          setActiveDelete(true);
                        }}
                      >
                        Xóa
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

            {listUserSearch.length === 0 &&
              ListOrder.map((item, index) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.orderDay}</TableCell>
                    <TableCell className="max-w-28">{item.userName}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>{item.paymentMethod}</TableCell>
                    <TableCell>{item.payment}</TableCell>
                    <TableCell>{item.orderStatus}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MangegerOrder;
