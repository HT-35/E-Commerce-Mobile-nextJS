/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';
import { it } from 'node:test';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const FormProfile = () => {
  const info = useAppSelector((state: any) => state.account);

  const [name, setName] = useState(info.name || '');
  const [email, setEmail] = useState(info.email || '');

  const [address, setAddress] = useState<[]>([]);

  const fileInputRef = useRef(null);

  // Optional: Update local state if info from Redux changes (reloading profile)
  useEffect(() => {
    setName(info.name || '');
    setEmail(info.email || '');
    const newArrAddress = info.address.map((item: any) => {
      return item.address_detail;
    });
    setAddress(newArrAddress);
  }, [info]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:items-start  px-2 overflow-x-auto max-sm:w-[400px]  max-md:w-[650px] max-lg:w-[900px]">
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <Table>
            <TableBody>
              <TableRow className="">
                <TableCell className="font-medium rounded-lg">Họ Và Tên </TableCell>
                <TableCell className="text-left rounded-lg">{name}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="font-medium">Email</TableCell>
                <TableCell className="text-left">{email}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="font-medium">Địa Chỉ Giao Hàng</TableCell>
                <TableCell className="text-left">
                  {address.map((item, index) => {
                    return (
                      <div key={index} className="mb-1">
                        {index + 1}) {item}
                      </div>
                    );
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
