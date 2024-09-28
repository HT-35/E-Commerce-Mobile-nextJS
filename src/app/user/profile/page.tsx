import { user } from "@/user";
import FormProfile from "@/components/user/profile";

import React from "react";

const ProfilePage = async () => {
  // const session = await auth();

  return (
    <>
      <h1 className="lg:text-3xl max-lg:text-xl">Hồ Sơ Của Tôi</h1>
      <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      <FormProfile></FormProfile>
    </>
  );
};



export default ProfilePage;
