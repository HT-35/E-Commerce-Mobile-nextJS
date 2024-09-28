import { user } from "@/user";
import FormPassword from "@/components/user/password";

import React from "react";

const PasswordPage = async () => {
  // const session = await auth();

  return (
    <>
      <h1 className="lg:text-3xl max-lg:text-xl">Đổi mật khẩu</h1>
      <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      <FormPassword></FormPassword>
    </>
  );
};



export default PasswordPage;
