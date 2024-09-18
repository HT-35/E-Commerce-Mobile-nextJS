"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormProfile = () => {
  return (
    <>
<Input type="email" placeholder="Email" className="mt-2 mb-2"/>
<Input type="text" placeholder="Tên" className="mt-2 mb-2"/>
<Input type="number" placeholder="Số điện thoại" className="mt-2 mb-2"/>
<Input type="email" placeholder="Địa chỉ" className="mt-2 mb-2"/>
<Button className="bg-[#dc0000] text-white">Lưu</Button>
    </>
  );
};

export default FormProfile;
