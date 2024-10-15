'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { InputSearch } from '@/components/input/InputSearch';
import { Button } from '@/components/ui/button';
import ModalCreate from '@/components/admin/modal/ModalCreate';
import ModalEdit from '@/components/admin/modal/ModalEdit';
import FormCreateUser from '@/components/admin/form/CreateUser';
import FormEditUser from '@/components/admin/form/EditUser';
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';
import Image from 'next/image';
import { TrashIcon } from '@radix-ui/react-icons';

const ManagerAccount = () => {
  const { name, _id, accessToken, email } = useAppSelector((item) => item.account);
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // State to store selected user ID

  // Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: 'localhost:3000/api/user/',
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserList(res.data.result);
    };
    fetchUsers();
  }, [accessToken]);

    // Fetch user
  // useEffect(() => {
  //   const fetchUser = async (id: string) => {
  //     const res = await sendRequest<IBackendRes<any>>({
  //       url: `localhost:3000/api/user/${id}`,
  //       method: 'GET',
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     });
  //     setUserList(res.data);
  //   };
  //   fetchUser();
  // }, [accessToken]);
  

  // Delete user function
  const handleDeleteUser = async (id: string) => {
    const confirmed = confirm('Bạn có chắc muốn xoá người dùng này?');
    if (confirmed) {
      try {
        await sendRequest({
          url: `localhost:3000/api/user?id=${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Update the UI by filtering out the deleted user
        setUserList((prevList) => prevList.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="">
      <div className="menu flex justify-between items-center mb-4">
        <div className="search">
          <InputSearch placeholder="Nhập email..." className="placeholder:text-black"></InputSearch>
        </div>

        <Button className="brand">Lọc Người Dùng</Button>

        <ModalCreate title="Tạo Tài Khoản Nhân Viên">
          <FormCreateUser />
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
          {userList.map((item, index) => (
            <TableRow key={index + 1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.roles}</TableCell>
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
                  alt="User Image"
                />
              </TableCell>
              <TableCell>
                <ModalEdit title="Sửa Tài Khoản Nhân Viên">
                  <FormEditUser userId={item._id} />
                </ModalEdit>
              </TableCell>
              <TableCell>
                <TrashIcon onClick={() => handleDeleteUser(item._id)} className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagerAccount;
